import * as config from "./config";
import { Emitter, fmtMMDDFromUnixSec, fmtTime, postJson } from "../util";

interface Props {
    msg: realtime.Message
}

export const SaveEvent = "SaveEvent"
export const DelEvent = "DelEvent"

function concatNames(msg: realtime.Message) {
    const names: string[] = []
    msg?.tags?.forEach(tag => names.push(tag.name))
    msg?.field?.forEach(f => names.push(f.name))
    msg?.tagInfo?.forEach(info => names.push(info.name))
    return [...new Set(names)]
}

function remove(msg: realtime.Message) {
    const url = config.saveUrl + "/" + msg.seq
    fetch(url, { method: 'DELETE' }).then(resp => {
        if (!resp.ok) throw new Error(`
            fail to delete ${url}
            err: ${resp.statusText}`)

    }).then(() => {
        // message.success("Deleted from DB.")
        Emitter.emit(DelEvent)
    }).catch(err => {
        // message.error(err)
    })
}

function save(msg: realtime.Message) {
    postJson(config.saveUrl, msg).then(() => {
        // message.success("Saved to DB.")
        Emitter.emit(SaveEvent)
    }).catch(err => {
        // message.error(err)
    })
}

export default function Message(props: Props) {
    let button = props.msg.userId >= 0 ?
        <button type="button" className="btn rounded-pill btn-outline-primary btn-sm" title="delete" onClick={() => remove(props.msg)}>
            <i className="bi bi-archive" />
        </button> :
        <button type="button" className="btn rounded-pill btn-outline-primary btn-sm" title="save" onClick={() => save(props.msg)}>
            <i className="bi bi-box-arrow-down" />
        </button>

    return (
        <div className="d-flex">
            <div className="d-flex flex-column justify-content-start align-items-start g-3">
                <code><small>{fmtTime(Number(props.msg.ctime))}</small></code>
                <code><small>{fmtMMDDFromUnixSec(Number(props.msg.ctime))}</small></code>
                {button}
            </div>
            <div>
                <a href={props.msg.url} target="_blank" rel="noreferrer" className="text-decoration-none text-reset">
                    <p className={props.msg.import === '3' ? 'text-danger' : ''}>
                        <strong>{'【' + props.msg.title + '】'}</strong>
                        {props.msg.digest}
                    </p>
                </a>
                <div>
                    {concatNames(props.msg).map(name => {
                        return (
                            <span className="badge bg-info rounded-pill" key={name}>{name}</span>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}