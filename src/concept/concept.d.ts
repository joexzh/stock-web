declare namespace concept {
    interface StockConceptDto {
        index: number
        id: string
        stockCode: string
        stockName: string
        conceptId: string
        conceptName: string
        description: string
        lastModified: string
    }

    interface Ret {
        code: number,
        message: string,
        result: StockConceptDto[]
    }

    interface FormVal {
        concept?: string,
        stock?: string
    }
}
