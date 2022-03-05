import * as config from "./config";
import notifyMe from "../notify";
import { useEffect, useRef, useState } from "react";
import { getJson } from "../util";
import produce from "immer";
import Raw from "./Raw";
import Group from "./Group";

function addList(list: realtime.Message[], newList: realtime.Message[]) {
    list.unshift(...newList)
}

function delOldList(list: realtime.Message[]) {
    if (list.length < 100) return []

    let indexes = [] as number[]
    let delList = [] as realtime.Message[]

    for (let i = list.length - 1; i > -1; i--) {
        let gap = Number(list[0].ctime) - Number(list[i].ctime)
        if (gap <= config.maxGap) {
            break
        }
        indexes.push(i)
        delList.push(list[i])
    }
    if (!indexes.length) return []

    list.splice(Math.min(...indexes), indexes.length)
    return delList
}

function findKw(kws: realtime.kw[], name: string) {
    return kws.find(kw => kw.name === name)
}

function arrangeKws(list: realtime.Message[]) {
    let kws = [] as realtime.kw[]
    list.forEach((msg) => {
        msg.tagInfo?.forEach((kw) => {
            if (config.excludedTagNames.includes(kw.name)) return

            let existKw = findKw(kws, kw.name)
            if (existKw) {
                existKw.count += 1
            } else {
                kws.push({ name: kw.name, count: 1 })
            }
        })
    })
    return kws.sort((a, b) => (a.count > b.count) ? -1 : 1)
}

// 改公告bury加g前缀, 防止纯数字出错
function modGG(filter: realtime.Filter[]) {
    let tag = filter.find(f => f.name === "公告")
    if (tag && /^\d+$/.test(tag.bury)) {
        tag.bury = "g" + tag.bury
    }
}

function notifyCb(list: realtime.Message[]) {
    list.forEach(m => {
        notifyMe(m.title, m.digest, m.url)
    })
}

function useRealtime(): [realtime.Message[], realtime.Filter[], realtime.Tag[]] {
    const [msgs, setMsgs] = useState([] as realtime.Message[])
    const msgsRef = useRef(msgs)
    const [kws, setKws] = useState([] as realtime.kw[])
    const [filters, setFilters] = useState([] as realtime.Filter[])


    useEffect(() => {
        let fetchData = (first?: boolean) => {
            let ctime
            if (msgsRef.current.length > 0) {
                ctime = msgsRef.current[0].ctime
            } else {
                let date = new Date()
                date.setDate(date.getDate() - config.dayBefore)
                ctime = Math.round(date.getTime() / 1000)
            }
            let url = config.realtimeMsgUrl + `ctime=${ctime}&page=${config.page}&pagesize=${config.pageSize}`

            return getJson<realtime.Wrapper>(url)
                .then(ret => {
                    if (first) {
                        modGG(ret.filter)
                        setFilters(ret.filter)
                    }

                    if (ret.list.length < 1) return

                    if (!first) {
                        notifyCb(ret.list)
                    }

                    setMsgs(preMsgs => {
                        return produce(preMsgs, draftList => {
                            addList(draftList, ret.list)
                            delOldList(draftList)
                        })
                    })

                })
                .catch(err => console.log(err))
        }

        let timer: NodeJS.Timeout
        let tick = () => {
            return setTimeout(() => {
                fetchData().finally(() => {
                    timer = tick()
                })
            }, config.interval)
        }
        fetchData(true)
        timer = tick()

        return () => {
            clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        msgsRef.current = msgs
        setKws(arrangeKws(msgs))
    }, [msgs])

    return [msgs, filters, kws]
}

export default function Realtime() {
    const [list, filters, kws] = useRealtime()

    return (
        <div className="row g-3">
            <div className="col-6">
                <Raw list={list} tags={filters} />
            </div>
            <div className="col-6">
                <Group list={list} tags={kws.slice(0, 10)} />
            </div>
        </div>
    )
}