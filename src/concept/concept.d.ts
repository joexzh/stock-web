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
}
