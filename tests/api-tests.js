'use strict'

import test from 'ava'
import request from 'supertest'
import server from '../server'

// test tipo callback
test.serial.cb('/login', t => {
  let datos = {
    "email": "asdasd"
  }
  request(server)
    .post('/login')
    .send(datos)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      let body = res.body
      /*t.deepEqual(body, {
        success: true,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYXNkYXNkIn0sImlhdCI6MTUyMzE1MzcwNCwiZXhwIjoxNTIzMTU3MzA0fQ.v0kv0x_QcNStMkyQOj5myuGk2yWyQjGgYGxv_hXVScY',
      }, 'response body shouldbe the expected')*/
      t.end() // solo se usa en los test tipo cb
    })
})
