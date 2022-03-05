import Nav from "./Nav";
import List from "./List";
import { useCallback, useEffect, useState } from "react";
import { Emitter, getJson } from "../util";
import * as config from "./config";
import { DelEvent, SaveEvent } from "./Message";

interface Props {
    list: realtime.Message[]
    tags: realtime.Tag[]
}

const defaultTag = "DB"
const defaultNavItem = { name: defaultTag }

interface SavedMessage {
    id: string
    userId: string
    message: realtime.Message
}

function filterList(tag: string, list: realtime.Message[]) {
    return list.filter(msg => msg.tagInfo?.some(info => info.name === tag))
}

async function getDbList() {
    let ret = await getJson(config.saveUrl)
    let savedMsgs = ret as SavedMessage[]
    return savedMsgs.map(item => {
        item.message.userId = item.userId
        item.message.objId = item.id
        return item.message
    })
}

export default function Group(props: Props) {
    const [tag, setTag] = useState(defaultTag)
    const [list, setList] = useState([] as realtime.Message[])
    const [tags, setTags] = useState([{ name: defaultTag }] as realtime.Tag[])

    const select = useCallback((tag: string) => {
        setTag(tag)
    }, [])

    const refreshDbList = useCallback(() => {
        getDbList().then(dbList => {
            setList(dbList)
        })
    }, [])

    useEffect(() => {
        if (tag === defaultTag) {
            refreshDbList()
        } else {
            setList(filterList(tag, props.list))
        }
    }, [tag, props.list, refreshDbList])

    useEffect(() => {
        Emitter.on(SaveEvent, () => {
            if (tag === defaultTag) {
                refreshDbList()
            }
        })
        Emitter.on(DelEvent, () => {
            if (tag === defaultTag) {
                refreshDbList()
            }
        })
        return () => {
            Emitter.off(SaveEvent)
            Emitter.off(DelEvent)
        }
    }, [tag, refreshDbList])

    useEffect(() => {
        props.tags.push(defaultNavItem)
        setTags(props.tags)
    }, [props.tags])

    return (
        <>
            <Nav tags={tags} selected={tag} select={select} />
            <List list={list} />
        </>
    )
}