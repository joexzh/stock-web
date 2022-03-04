import Nav from "./Nav";
import {useCallback, useEffect, useState} from "react";
import List from "./List";

interface Props {
    list: realtime.Message[]
    tags: realtime.Tag[]
}

const defaultTag = "全部"

function getFilteredList(name: string, list: realtime.Message[]) {
    if (name === defaultTag) return list
    return list.filter(msg => msg.tags.some(tag => tag.name === name))
}

export default function Raw(props: Props) {
    const [tag, setTag] = useState(defaultTag)

    const select = useCallback((tag: string) => {
        setTag(tag)
    }, [])

    useEffect(() => {
        if (props.tags && props.tags.length) {
            setTag(props.tags[0].name)
        }
    }, [props.tags])

    return (
        <>
            <Nav tags={props.tags} selected={tag} select={select}/>
            <List list={getFilteredList(tag, props.list)}/>
        </>
    )
}