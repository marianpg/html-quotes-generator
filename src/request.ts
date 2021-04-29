'use strict';

import fetch, { RequestInit } from 'node-fetch'

type RequestInfo = {
    url: string,
    method: 'Get' | 'Post'
}

class Request {
    constructor(private options: RequestInfo) { }

    async retrieveJson(): Promise<any> {
        const result = await fetch(this.options.url, { method: this.options.method })
        const json = await result.json()

        return json
    }
}


export default Request
export {
    RequestInfo
}