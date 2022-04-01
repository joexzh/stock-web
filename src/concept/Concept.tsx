import Search from "./Search";
import React, { useCallback, useEffect, useState } from "react";
import { getJson } from "../util";
import * as config from "./config"
import Table from "./ConceptTable";

export default function Concept() {
    const [list, setList] = useState([] as concept.StockConceptDto[])

    const submit = useCallback((vals: concept.FormVal) => {
        getJson<concept.Ret>(
            `${config.ConceptUrl}?concept=${vals.concept ? vals.concept : ""}&stock=${vals.stock ? vals.stock : ""}`)
            .then(ret => {
                setList(ret.result)
            })
    }, [])

    useEffect(() => {
        submit({})
    }, [submit])

    return (
        <React.Fragment>
            <Search callback={submit} />
            <Table list={list} />
        </React.Fragment>
    )
}