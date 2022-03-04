interface Props {
    list: concept.StockConceptDto[]
}

export default function ConceptTable(props: Props) {
    return (
        <table className="table table-sm table-bordered">
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
                    <tr key={i}>
                        <th scope="row">{i}</th>
                        <td>{item.lastModified}</td>
                        <td><a href={`http://basic.10jqka.com.cn/${item.stockCode}/`} target="_blank"
                               rel="noreferrer">{item.stockCode}</a></td>
                        <td>{item.stockName}</td>
                        <td>{item.conceptName}</td>
                        <td>{item.description}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}