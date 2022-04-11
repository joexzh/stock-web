import {ApiPrefix} from "../config";
import React from "react";

export const ConceptUrl = `${ApiPrefix}/api/stockconcept`
export const ConceptLineCmpUrl = `${ApiPrefix}/api/concept/line/cmp`

export const TableType = "table"
export const CmpType = "cmp"

export const ConceptContext = React.createContext({
    type: "",
    switch: (type: string) => {
    },
    submitTb: (vals: concept.FormVal) => {
    },
    submitCmp: (vals: concept.CmpFormVal) => {
    },
});

export const CmpContext = React.createContext({
    changeBgColor: (plateId: string) => {
    },
    clearBgColor: (plateId: string) => {
    }
})