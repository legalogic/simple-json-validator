class ValidationError extends Error {
  constructor(path, msg = null) {
    const pathStr = JSON.stringify(path)
    super(`schema validation error at: ${pathStr}. message: ${msg}`)
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = {
  ValidationError
}
