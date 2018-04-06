'use strict'

const debug = require('debug')('api-rest:api')
// import debug from 'debug/api-res:api'
import http from 'http'
import chalk from 'chalk'
import express from 'express'

import api from './api'
import { ErrorHandler, handlerFatalError } from './ErrorHandler'

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

app.use('/api', api)

// manejo de errores
app.use((err, req, res, next) => {
  debug(`Error ${err.message}`)
  res.status(err.status).send({error:err.message})
})

process.on('uncaughtExeption', handlerFatalError)
process.on('unhandleRejection', handlerFatalError)

server.listen(port, () => {
  console.log(`${chalk.green('[api-node]')} server listening on port ${port}`)
})
