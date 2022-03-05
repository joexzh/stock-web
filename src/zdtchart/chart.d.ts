declare namespace chart {
    interface ZDTHistory {
        date: string
        longLimitCount: number
        shortLimitCount: number
        stopTradeCount: number
        amount: number
        shLongCount: number
        shEvenCount: number
        shShortCount: number
        szLongCount: number
        szEvenCount: number
        szShortCount: number
    }

    interface chartData {
        date: string
        longLimitCount: number
        shortLimitCount: number
        longShortLimitRate: number
        amount: number
        longCount: number
        shortCount: number
        longShortRate: number
    }

    interface ChartMap {
        [key: string]: {
            label: string
            color: string
            yAxisID: string
        }
    }
}
