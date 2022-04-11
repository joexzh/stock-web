import {useEffect, useState} from "react"
import {fmtDate} from "../util"

interface Props {
    list: concept.StockConceptDto[]
    hidden: boolean
}

interface TrProps {
    row: number
    sc: concept.StockConceptDto
}

interface TrPartialProps {
    bgColor: string
    bgColorMain: string
    time: string
    code: string
    link: string
    description: string
}

const conceptLinkPrefix = "http://q.10jqka.com.cn/gn/detail/code"
const stockF10LinkPrefix = "http://basic.10jqka.com.cn"

function useTrPropSwitch(props: TrProps): [TrPartialProps, () => void] {
    const [trPartialProps, setTrPartialProps] = useState<TrPartialProps>({
        bgColor: "",
        bgColorMain: "bg-warning bg-opacity-10",
        time: props.sc.updatedAt,
        code: props.sc.stockCode,
        link: `${stockF10LinkPrefix}/${props.sc.stockCode}`,
        description: props.sc.description
    })

    useEffect(() => {
        setTrPartialProps({
            bgColor: "",
            bgColorMain: "bg-warning bg-opacity-10",
            time: props.sc.updatedAt,
            code: props.sc.stockCode,
            link: `${stockF10LinkPrefix}/${props.sc.stockCode}`,
            description: props.sc.description
        })
    }, [props])

    function change() {
        if (trPartialProps.bgColor === "") {
            setTrPartialProps({
                bgColor: "bg-info",
                bgColorMain: "bg-warning",
                time: props.sc.conceptUpdatedAt,
                code: props.sc.conceptId,
                link: `${conceptLinkPrefix}/${props.sc.conceptId}`,
                description: props.sc.conceptDefine
            })
        } else {
            setTrPartialProps({
                bgColor: "",
                bgColorMain: "bg-warning bg-opacity-10",
                time: props.sc.updatedAt,
                code: props.sc.stockCode,
                link: `${stockF10LinkPrefix}/${props.sc.stockCode}`,
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
            <td className={trPartialProps.bgColor}>
                <a href={trPartialProps.link} target="_blank" rel="noreferrer">
                    {trPartialProps.code}
                </a>
            </td>
            <td>{props.sc.stockName}</td>
            <td className={trPartialProps.bgColorMain} onClick={changeDescription} style={{cursor: "pointer"}}
                title="点击切换stock/concept">
                {props.sc.conceptName}
            </td>
            <td className={trPartialProps.bgColor}>{trPartialProps.description}</td>
        </tr>
    )
}

export default function ConceptTable(props: Props) {
    let display = props.hidden ? "d-none" : ""

    return (
        <table className={`table table-sm table-bordered ${display}`}>
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Symbol</th>
                <th scope="col" style={{minWidth: "82px"}}>Stock</th>
                <th scope="col">Concept</th>
                <th scope="col">Description</th>
            </tr>
            </thead>
            <tbody>
            {props.list.map((item, i) => {
                return (
                    <TableRow key={i} row={i} sc={item}/>
                )
            })}
            </tbody>
        </table>
    )
}