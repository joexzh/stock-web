import {useEffect, useState} from "react"
import { fmtDate } from "../util"

interface Props {
    list: concept.StockConceptDto[]
}

interface TrProps {
    row: number
    sc: concept.StockConceptDto
}

interface TrPartialProps {
    bgColor: string
    bgColorMain: string
    time: string
    description: string
}

function useTrPropSwitch(props: TrProps): [TrPartialProps, () => void] {
    const [trPartialProps, setTrPartialProps] = useState<TrPartialProps>({
        bgColor: "",
        bgColorMain: "",
        time: props.sc.updatedAt,
        description: props.sc.description
    })

    useEffect(() => {
        setTrPartialProps({
            bgColor: "",
            bgColorMain: "",
            time: props.sc.updatedAt,
            description: props.sc.description
        })
    }, [props])

    function change() {
        if (trPartialProps.bgColor === "") {
            setTrPartialProps({
                bgColor: "bg-info",
                bgColorMain: "bg-warning",
                time: props.sc.conceptUpdatedAt,
                description: props.sc.conceptDefine
            })
        } else {
            setTrPartialProps({
                bgColor: "",
                bgColorMain: "",
                time: props.sc.updatedAt,
                description: props.sc.description
            })
        }
    }
    return [trPartialProps, change]
}

function TableRow(props: TrProps) {
    const [trPartialProps, changeTrPartialProps] = useTrPropSwitch(props)

    function changeDescription() {
        changeTrPartialProps()
    }

    return (
        <tr>
            <th scope="row">{props.row}</th>
            <td className={trPartialProps.bgColor}>{fmtDate(new Date(trPartialProps.time))}</td>
            <td>
                <a href={`http://basic.10jqka.com.cn/${props.sc.stockCode}/`} target="_blank" rel="noreferrer">
                    {props.sc.stockCode}
                </a>
            </td>
            <td>{props.sc.stockName}</td>
            <td className={trPartialProps.bgColorMain} onClick={changeDescription} style={{cursor: "pointer"}}>
                {props.sc.conceptName}
            </td>
            <td className={trPartialProps.bgColor}>{trPartialProps.description}</td>
        </tr>
    )
}

export default function ConceptTable(props: Props) {
    return (
        <table className="table table-sm table-bordered">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Symbol</th>
                    <th scope="col" style={{ minWidth: "82px" }}>Stock</th>
                    <th scope="col">Concept</th>
                    <th scope="col">Description</th>
                </tr>
            </thead>
            <tbody>
                {props.list.map((item, i) => {
                    return (
                        <TableRow key={i} row={i} sc={item} />
                    )
                })}
            </tbody>
        </table>
    )
}