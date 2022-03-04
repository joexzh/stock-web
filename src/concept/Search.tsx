import {ChangeEvent, FormEvent, useCallback, useState} from "react";

interface Props {
    callback: (vals: concept.FormVal) => void
}

export default function Search(props: Props) {
    const [concept, setConcept] = useState("")
    const [stock, setStock] = useState("")

    const changeConcept = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setConcept(e.target.value)
    }, [])

    const changeStock = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setStock(e.target.value)
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        props.callback({concept, stock})
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-2">
                <div className="col-auto">
                    <input type="text" id="concept" className="form-control" aria-describedby="concept"
                           placeholder="concept"
                           value={concept} onChange={changeConcept}/>
                </div>
                <div className="col-auto">
                    <input type="text" id="stock" className="form-control" aria-describedby="stock" placeholder="stock"
                           value={stock} onChange={changeStock}/>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary" id="search">搜索</button>
                </div>
            </div>
        </form>
    )
}