'use strict'

class ErrorHandler extends Error {
  constructor (message, status) {
  
    // Llamando al contructor padre de la clase Error.
    super(message);
    super(status);
    
    // Guardar el nombre de la clase padre en la propiedad de nuestraclase como un acceso directo.
    this.name = this.constructor.name;
    this.status = status || 500;
    this.message = message|| 'internal server Error';

    // CaptureStackTrace, excluyendo la llamada al contructor.
    Error.captureStackTrace(this, this.constructor);
  }

}

function handlerFatalError(err) {
  console.error(`${chalk.red('[fatel error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

module.exports = {
  ErrorHandler: ErrorHandler,
  handlerFatalError: handlerFatalError,
}
