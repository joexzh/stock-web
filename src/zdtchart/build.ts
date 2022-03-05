import Chart from 'chart.js/auto';
import * as util from "../util";

interface Props {
    ctx?: HTMLCanvasElement | null
    list: chart.chartData[]
}

const dataMap: chart.ChartMap = {
    amount: {
        label: '两市成交量',
        color: 'rgba(0, 0, 0, 0.5)',
        yAxisID: 'yAmount'
    },
    longShortLimitRate: {
        label: '涨停 / 跌停',
        color: 'rgba(255, 0, 0, 0.5)',
        yAxisID: 'yLongShortLimitRate'
    },
    longShortRate: {
        label: '上涨 / 下跌',
        color: 'rgba(255, 128, 0, 0.5)',
        yAxisID: 'yLongShortRate'
    }
}

function createDatasets(dataMap: chart.ChartMap, list: chart.chartData[]) {
    const datasets = [] as any[]
    for (const key in dataMap) {
        datasets.push({
            label: dataMap[key].label,
            data: list,
            parsing: {
                yAxisKey: key
            },
            yAxisID: dataMap[key].yAxisID,
            borderColor: dataMap[key].color,
            backgroundColor: dataMap[key].color
        })
    }
    return datasets
}

function createScales(dataMap: chart.ChartMap) {
    const scales = {} as NodeJS.Dict<any>
    for (const key in dataMap) {
        scales[dataMap[key].yAxisID] = {
            beginAtZero: true,
            position: key === 'amount' ? 'left' : 'right',
            grid: {
                drawOnChartArea: false,
            },
            ticks: {
                color: dataMap[key].color
            },
        }
    }
    return scales
}

export function makeData(list: chart.ZDTHistory[]): chart.chartData[] {
    const dataList = [] as chart.chartData[]

    list.forEach(item => {
        const chartData: chart.chartData = {
            date: util.fmtMMDD(new Date(item.date)),
            amount: item.amount,
            longLimitCount: item.longLimitCount,
            shortLimitCount: item.shortLimitCount,
            longShortLimitRate: item.longLimitCount / item.shortLimitCount,
            longCount: item.shLongCount + item.szLongCount,
            shortCount: item.shShortCount + item.szShortCount,
            longShortRate: 0.0
        }
        chartData.longShortRate = chartData.longCount / chartData.shortCount
        dataList.push(chartData)

    })
    return dataList
}

export default function createChart(props: Props) {
    if (!props.ctx) return null

    const labels = props.list.map(item => item.date)

    return new Chart(
        props.ctx,
        {
            type: 'line',
            data: {
                labels: labels,
                datasets: createDatasets(dataMap, props.list)
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (ctx) {
                                const chartData = ctx.raw as chart.chartData

                                switch (ctx.dataset.label) {
                                    case dataMap.amount.label:
                                        return `${ctx.dataset.label}: ${ctx.formattedValue} 亿`
                                    case dataMap.longShortLimitRate.label:
                                        return `${ctx.dataset.label}: ${chartData.longLimitCount} / ${chartData.shortLimitCount}`
                                    case dataMap.longShortRate.label:
                                        return `${ctx.dataset.label}: ${chartData.longCount} / ${chartData.shortCount}`
                                    default:
                                        return `${ctx.dataset.label}`
                                }
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                parsing: {
                    xAxisKey: 'date'
                },
                scales: createScales(dataMap)
            }
        }
    )
}