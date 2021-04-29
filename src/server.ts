'use strict'

import express, { Express } from 'express'
import asyncHandler from 'express-async-handler'
import HtmlTemplate from './html-template'

const port = 8081

import { default as Request } from './request'

class Server {
    private app: Express

    constructor(private port) {
        this.app = express()
    }

    private async init(): Promise<void> {

        this.app.get('/', asyncHandler(async (_, res) => {
            const request = new Request({
                url: 'https://api.quotable.io/random',
                method: 'Get'
            })
            const response = await request.retrieveJson()
            const { author = '', content = '' } = response
            const template = new HtmlTemplate(author, content)
            const html = template.render()

            res.send(html)
        }))
    }

    start() {
        this.init()
        .then(_ => {
            this.app.listen(this.port, () => {
                console.log(`Server listening at http://localhost:${this.port}`)
            })
        })
        .catch(error => {
            console.error('Server Error', error)
        })
    }
}

const server = new Server(port)

server.start()