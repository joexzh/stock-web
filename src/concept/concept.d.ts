declare namespace concept {
    interface StockConceptDto {
        stockCode: string
        stockName: string
        description: string
        updatedAt: string
        conceptId: string
        conceptName: string
        conceptPlateId: string
        conceptDefine: string
        conceptUpdatedAt: string
    }

    interface Ret {
        code: number
        message: string
        result: StockConceptDto[]
    }

    interface FormVal {
        concept?: string
        stock?: string
    }

    interface CmpFormVal {
        start?: string
        end?: string
    }

    interface ConceptLineCmpDto {
        date: string
        lines: ConceptLineDto[]
        lineDict: { [key: string]: ConceptLineDto }
    }

    interface ConceptLineDto {
        conceptName: string
        plateId: string
        date: string
        open: number
        high: number
        low: number
        close: number
        pctChg: number
        volume: number
        amount: number

        // for render
        pctChg2: string
        bgColor: string
    }
}
