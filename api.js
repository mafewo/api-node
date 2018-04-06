'use strict'

const debug = require('debug')('api-rest:api:routes')

import express from 'express'
import { ErrorHandler, handlerFatalError } from './ErrorHandler'

const api = express.Router()

api.get('/agents', (req, res) => {
  debug('debug')
  res.send({})
})

api.get('/agent/:uuid', (req, res, next) => {
  const { uuid } = req.params
  if (uuid !== '12') {
    return next(new ErrorHandler('Este es un mensjaje re copado', 404))
  }
  res.send({ uuid })
})

api.get('/metrics/:uuid', (req, res) => {
  const { uuid } = req.params
  res.send({ uuid })
})

api.get('/metrics/:uuid/:type', (req, res) => {
  const { uuid, type } = req.params
  res.send({ uuid, type })
})

module.exports = api
