import {ChangeEvent, FormEvent, useCallback, useContext, useState} from "react";
import {fmtDate} from "../util";
import * as config from "./config"

function SearchTb() {
    const [stock, setStock] = useState("")
    const [concept, setConcept] = useState("")
    const ctx = useContext(config.ConceptContext)

    const changeStock = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setStock(e.target.value)
    }, [])

    const changeConcept = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setConcept(e.target.value)
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        ctx.submitTb({stock, concept})
    }

    return (
        <form onSubmit={handleSubmit} onClick={() => ctx.switch(config.TableType)}>
            <fieldset disabled={ctx.type !== config.TableType}>
                <div className="row g-3 mb-2">
                    <div className="col-auto">
                        <input type="text" id="stock" className="form-control" aria-describedby="stock"
                               placeholder="stock"
                               value={stock} onChange={changeStock}/>
                    </div>
                    <div className="col-auto">
                        <input type="text" id="concept" className="form-control" aria-describedby="concept"
                               placeholder="concept"
                               value={concept} onChange={changeConcept}/>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">搜索</button>
                    </div>
                </div>
            </fieldset>
        </form>
    )
}

function SearchCmp() {
    const [start, setStart] = useState(() => {
        const d = new Date()
        d.setDate(d.getDate() - 10)
        return fmtDate(d)
    })
    const [end, setEnd] = useState(fmtDate(new Date()))
    const ctx = useContext(config.ConceptContext)

    const changeStart = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setStart(e.target.value)
    }, [])

    const changeEnd = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEnd(e.target.value)
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        ctx.submitCmp({start, end})
    }

    return (
        <form onSubmit={handleSubmit} onClick={() => ctx.switch(config.CmpType)}>
            <fieldset disabled={ctx.type !== config.CmpType}>
                <div className="row g-3 mb-2">
                    <div className="col-auto">
                        <input type="date" id="stock" className="form-control" aria-describedby="stock"
                               placeholder="stock"
                               value={start} onChange={changeStart}/>
                    </div>
                    <div className="col-auto">
                        <input type="date" id="concept" className="form-control" aria-describedby="concept"
                               placeholder="concept"
                               value={end} onChange={changeEnd}/>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary" id="search">搜索</button>
                    </div>
                </div>
            </fieldset>
        </form>
    )
}

export default function Search() {
    return (
        <div className="row">
            <div className="col-auto">
                <SearchTb/>
            </div>
            <div className="col-auto">
                <SearchCmp/>
            </div>
        </div>
    )
}