'use strict'

const debug = require('debug')('platziverse:api:db')

module.exports = {
  db: {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'platzi',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s)
  },
  authentication: {
    secret: process.env.JWR_SECRET || 'xvnFRjj6ENYJPR1wOanZL7msoCr07bH8XHZrod1txLhsjMx9FsjWZcrPpw8Pt1O'
  }
}
