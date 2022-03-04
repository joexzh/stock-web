import mitt from "mitt"

export function fmtDateFromUnixSec(unixSecs: number) {
    let d = new Date(unixSecs * 1000)
    return fmtDate(d)
}

export function fmtDate(date: Date) {
    return date.getFullYear().toString().padStart(4, "0") + "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") + "-" +
        date.getDate().toString().padStart(2, "0")
}

export function fmtMMDDFromUnixSec(unixSecs: number) {
    let d = new Date(unixSecs * 1000)
    return fmtMMDD(d)
}

export function fmtMMDD(date: Date) {
    return (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0")
}

export function fmtTime(unixSecs: number) {
    let d = new Date(unixSecs * 1000)
    return d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0") + ":" + d.getSeconds().toString().padStart(2, "0")
}

export async function getJson<T = any>(url: string): Promise<T> {
    const resp = await fetch(url)
    if (!resp.ok) {
        throw new Error(`
        fail to getJson ${url}
        err: ${resp.statusText}`)
    }
    return await resp.json()
}

export async function postJson(url: string, obj: any) {
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    if (!resp.ok) {
        throw new Error(`
        fail to postJson ${url}
        err: ${resp.statusText}`)
    }
    return resp
}

export const Emitter = mitt()