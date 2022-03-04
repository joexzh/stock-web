interface Props {
    tags: realtime.Tag[]
    selected: string
    select: (name: string) => void
    group?: boolean
}

export default function Nav(props: Props) {
    function changeNav(name: string) {
        props.select(name)
    }

    return (
        <ul className="nav nav-pills">
            {props.tags.map((tag, i) => {
                return (
                    <li className="nav-item" key={tag.id || tag.name}>
                        <button className={`nav-link ${props.selected === tag.name ? "active" : ""}`} type="button"
                           onClick={() => changeNav(tag.name)}>
                            {tag.name}
                            {tag.count && (
                                <sup>
                                <span className="badge rounded-pill bg-danger">
                                {tag.count}</span>
                                </sup>)}

                        </button>
                    </li>

                )
            })}
        </ul>
    )
}