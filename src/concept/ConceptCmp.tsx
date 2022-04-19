import {fmtDate} from "../util";
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {CmpContext} from "./config";

interface Props {
    list: concept.ConceptLineCmpDto[]
    hidden: boolean
}

interface OneProps {
    one: concept.ConceptLineCmpDto
}

function ConceptCmpOne(props: OneProps) {
    const ctxVal = useContext(CmpContext);

    return (<ul className="list-group">
        <li className="list-group-item"><strong>{fmtDate(new Date(props.one.date))}</strong></li>
        {props.one.lines.map(line => {
            const bgColor = line.bgColor ? line.bgColor : "";
            return (
                <li className={`list-group-item ${bgColor}`} key={line.plateId} title={`${line.plateId} ${line.close}`}
                    onMouseEnter={() => ctxVal.changeBgColor(line.plateId)}
                    onMouseLeave={() => ctxVal.clearBgColor(line.plateId)}>
                    {line.conceptName}&nbsp;
                    <span className={line.pctChg > 0 ? "text-danger" : "text-success"}>{line.pctChg2}</span>
                </li>
            )
        }

        )}
    </ul>)
}

function changeBgColor(plateId: string, list: concept.ConceptLineCmpDto[]) {
    list.forEach(item => {
        let line = item.lineDict[plateId]
        if (line) {
            line.bgColor = "bg-info bg-capacity-50"
        }
    })
}

function clearBgColor(plateId: string, list: concept.ConceptLineCmpDto[]) {
    list.forEach(item => {
        let line = item.lineDict[plateId]
        if (line) {
            line.bgColor = ""
        }
    })
}

export default function ConceptCmp(props: Props) {
    const [list, setList] = useState([] as concept.ConceptLineCmpDto[])

    useEffect(() => {
        setList(props.list)
    }, [props.list])

    const chgBgColor = useCallback((plateId: string) => {
        changeBgColor(plateId, props.list)
        setList([...props.list])
    }, [props.list])

    const clsBgColor = useCallback((plateId: string) => {
        clearBgColor(plateId, props.list)
        setList([...props.list])
    }, [props.list])

    const ctxVal = useMemo(() => {
        return {
            changeBgColor: chgBgColor,
            clearBgColor: clsBgColor
        }
    }, [chgBgColor, clsBgColor])

    let display = props.hidden ? "d-none" : ""

    return (<div className={display}>
        <div className="row flex-row flex-nowrap">
            <CmpContext.Provider value={ctxVal}>
                {list.map(one =>
                    <div className="col-auto" key={one.date}>
                        <ConceptCmpOne one={one}/>
                    </div>
                )}
            </CmpContext.Provider>

        </div>
    </div>)
}