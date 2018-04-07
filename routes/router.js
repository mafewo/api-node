'use strict'
import express from 'express'
import asyncify from 'express-asyncify'
import auth from 'express-jwt'

import { authentication } from '../config/config'
import { ErrorHandler } from '../libs/ErrorHandler'
import { AuthController } from '../Controllers/AuthController'

const debug = require('debug')('api-rest:api:routes')
const router = express.Router()

router.post('/login', (req, res, next) => {
  const authcontroller = new AuthController(req, res, next)
  authcontroller.login()
})

router.get('/agents', auth(authentication), (req, res) => {
  debug('debug')
  console.log(asyncify)
  res.status.send({})
})

router.get('/agent/:uuid', (req, res, next) => {
  const { uuid } = req.params
  if (uuid !== '12') {
    return next(new ErrorHandler('Este es un mensjaje re copado', 404))
  }
  res.send({ uuid })
})

router.get('/metrics/:uuid', (req, res) => {
  const { uuid } = req.params
  res.send({ uuid })
})

router.get('/metrics/:uuid/:type', (req, res) => {
  const { uuid, type } = req.params
  res.send({ uuid, type })
})

export default router;
