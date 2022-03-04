import Message from "./Message";

interface Props {
    list: realtime.Message[]
}

export default function List(props: Props) {
    return (
        <ul className="list-group list-group-flush">
            {props.list.map(msg => {
                return (
                    <li className="list-group-item" key={msg.objId || msg.id}>
                        <Message msg={msg}/>
                    </li>
                )
            })}
        </ul>
    )
}