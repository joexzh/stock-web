import Search from "./Search";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {getJson} from "../util";
import * as config from "./config"
import Table from "./ConceptTable";
import ConceptCmp from "./ConceptCmp";

function fillLineCmpList(list: concept.ConceptLineCmpDto[]) {
    list.forEach(item => {
        item.lineDict = {}
        item.lines.forEach(line => {
            line.pctChg2 = (line.pctChg * 100).toFixed(2) + "%"
            item.lineDict[line.plateId] = line;
        })
    })
}

export default function Concept() {
    const [tbList, setTbList] = useState([] as concept.StockConceptDto[])
    const [lineCmpList, setLineCmpList] = useState([] as concept.ConceptLineCmpDto[])
    const [display, setDisplay] = useState(config.TableType)

    const switchDisplay = useCallback((type: string) => {
        setDisplay(type)
    }, [])

    const submitTb = useCallback((vals: concept.FormVal) => {
        getJson<concept.Ret>(
            `${config.ConceptUrl}?concept=${vals.concept ? vals.concept : ""}&stock=${vals.stock ? vals.stock : ""}`)
            .then(ret => {
                setTbList(ret.result)
            })
    }, [])

    const submitCmp = useCallback((vals: concept.CmpFormVal) => {
        getJson<concept.ConceptLineCmpDto[]>(
            `${config.ConceptLineCmpUrl}?start=${vals.start ? vals.start : ""}&end=${vals.end ? vals.end : ""}`)
            .then(ret => {
                fillLineCmpList(ret)
                setLineCmpList(ret)
            })
    }, [])

    const ctxVal = useMemo(() => {
        return {
            type: display,
            switch: switchDisplay,
            submitTb: submitTb,
            submitCmp: submitCmp,
        }
    }, [display, switchDisplay, submitTb, submitCmp])

    useEffect(() => {
        submitTb({})
    }, [submitTb])

    return (
        <config.ConceptContext.Provider value={ctxVal}>
            <Search/>
            <Table list={tbList} hidden={display !== config.TableType}/>
            <ConceptCmp list={lineCmpList} hidden={display !== config.CmpType}/>
        </config.ConceptContext.Provider>
    )
}