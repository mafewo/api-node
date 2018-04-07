'use strict'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import { authentication } from '../config/config'

export function createJWToken (details) {
  if (typeof details !== 'object') {
    details = {}
  }

  if (!details.maxAge || typeof details.maxAge !== 'number') {
    details.maxAge = 3600
  }

  details.sessionData = _.reduce(details.sessionData || {}, (memo, val, key) => {
    if (typeof val !== 'function' && key !== 'password') {
      memo[key] = val
    }
    return memo
  }, {})

  let token = jwt.sign({
    data: details.sessionData
  },
  authentication.secret,
  {
    expiresIn: details.maxAge,
    algorithm: 'HS256'
  })

  return token
}
