'use strict'

import test from 'ava'
import request from 'supertest'
import server from '../server'

// test tipo callback
test.serial.cb('/api/agents', t => {
  request(server)
    .get('/api/agents')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      let body = res.body
      t.deepEqual(body, {}, 'response body shouldbe the expected')
      t.end() // solo se usa en los test tipo cb
    })
})
