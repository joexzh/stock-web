declare namespace realtime {
    interface nameable {
        name: string
    }

    interface Tag {
        id?: string
        name: string
        count?: number
    }

    type Wrapper = {
        list: Message[],
        filter: Filter[],
        kws: kw[]
    }

    type Message = {
        id: string,
        userId: number,
        seq: string,
        title: string,
        digest: string,
        url: string,
        appUrl: string,
        shareUrl: string,
        stock?: Stock[]
        field?: Stock[],
        color: string,
        tag?: string,
        tags?: Tag[],
        ctime: string,
        rtime: string,
        source: string,
        short: string,
        nature: string,
        import: string,
        tagInfo?: TagInfo[]
    }

    type Stock = {
        name: string,
        stockCode: string,
        stockMarket: string
    }

    type TagInfo = {
        id: string,
        name: string,
        type: string,
        score: string
    }

    type Filter = {
        id: string,
        name: string,
        bury: string
    }

    type kw = {
        name: string,
        count: number
    }
}