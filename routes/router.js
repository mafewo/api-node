'use strict'

import express from 'express'
import asyncify from 'express-asyncify'
import auth from 'express-jwt'

import { authentication } from '../config/config'
import { ErrorHandler } from '../libs/ErrorHandler'
import { createJWToken } from '../libs/auth'

const debug = require('debug')('api-rest:api:routes')
const router = express.Router()

router.post('/login', (req, res) => {
  let { email, password } = req.body
  let token = createJWToken({
    sessionData: {
      email: email,
      password: password
    },
    maxAge: 3600
  })
  res.status(200)
    .json({
      success: true,
      token: token
    })
  /*
    db.User.findByEmail(email)
      .then((user) => (!user) ? Promise.reject("User not found.") : user)
      .then((user) => user.comparePassword(password))
      .then((user) => user.publicParse(user))
      .then((user) => {
        res.status(200)
          .json({
            success: true,
            token: createJWToken({
              sessionData: user,
              maxAge: 3600
            })
          })
      })
      .catch((err) => {
        res.status(401)
          .json({
            message: err || "Validation failed. Given email and password aren't matching."
          })
      }) */
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

module.exports = router
