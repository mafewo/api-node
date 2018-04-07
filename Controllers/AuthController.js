import { createJWToken } from '../libs/auth'
  
class AuthController {
  constructor(request, response, next) {
    this.request = request
    this.response = response
    this.next = next
  }

  login (request) {
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
  }
}
var a = new AuthController();
module.exports = {AuthController: AuthController};
