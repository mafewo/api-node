'use strict'

import ErrorHandler from './ErrorHandler'

class RequestValidatorError extends ErrorHandler {
  constructor (fields) {
    // Overriding both message and status code.
    super('Request validation failed', 400)
    // Saving custom property.
    this.fields = fields || {}
  }
}

export default RequestValidatorError
