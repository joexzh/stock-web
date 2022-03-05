import { useEffect, useRef } from "react";
import createChart, { makeData } from "./build";
import { getJson } from "../util";
import { Url } from "./config";
import { type Chart } from "chart.js";

export default function ZDT() {
    const ref = useRef(null as HTMLCanvasElement | null)

    useEffect(() => {
        let chart = null as Chart | null
        getJson<chart.ZDTHistory[]>(Url).then(ret => {
            const list = makeData(ret)
            chart = createChart({ ctx: ref.current, list })
        })
        return () => {
            if (chart) {
                chart.clear()
            }
        }
    }, [ref])

    return (
        <canvas id="myChart" width="100%" height="49%" ref={ref}>
            <p>Your browser don't support canvas.</p>
        </canvas>
    )
}