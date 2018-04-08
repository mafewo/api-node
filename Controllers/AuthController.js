import { createJWToken } from '../libs/auth'
import { ErrorHandler } from '../libs/ErrorHandler'
// import { Joi } from "joi";
const Joi = require('joi')

class AuthController {
  constructor (request, response, next) {
    this.request = request
    this.response = response
    this.next = next
  }

  login (request) {
    const schema = {
      email: Joi.string().min(3).required()
    }
    this.validate(this.request.body, schema)
    let { email, password } = this.request.body
    let token = createJWToken({
      sessionData: {
        email: email,
        password: password
      },
      maxAge: 3600
    })
    this.response.status(200)
      .json({
        success: true,
        token: token
      })
  }

  validate (req, schema) {
    const resvalidate = Joi.validate(req, schema)
    if (resvalidate.error) {
      return this.next(new ErrorHandler({
        success: false,
        message: resvalidate.error.details[0].message
      }, 400))
    }
  }
}
/*
      db.User.findByEmail(email)
        .then((user) => (!user) ? Promise.reject("User not found.") : user)
        .then((user) => user.comparePassword(password))
        .then((user) => user.publicParse(user))
        .then((user) => {
          this.response.status(200)
            .json({
              success: true,
              token: createJWToken({
                sessionData: user,
                maxAge: 3600
              })
            })
        })
        .catch((err) => {
          this.response.status(401)
            .json({
              message: err || "Validation failed. Given email and password aren't matching."
            })
        }) */
module.exports = { AuthController: AuthController }
