'use strict'
import http from 'http'
import chalk from 'chalk'
import express from 'express'
import bodyParser from 'body-parser'
import router from './routes/router'
import { handlerFatalError } from './libs/ErrorHandler'

const debug = require('debug')('api-rest:router')
// import debug from 'debug/api-res:api'
const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/', router)
// manejo de errores
app.use((err, req, res, next) => {
  debug(`Error ${err.message}`)
  res.status(err.status || 500).send({error: err.message})
})

if (!module.parent) {
  process.on('uncaughtExeption', handlerFatalError)
  process.on('unhandleRejection', handlerFatalError)

  server.listen(port, () => {
    console.log(`${chalk.green('[api-node]')} server listening on port ${port}`)
  })
}
module.exports = server
