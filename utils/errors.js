class ValidationError extends Error {
  constructor (path) {
    const pathStr = JSON.stringify(path)
    super(`schema validation error at: ${pathStr}`)
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = {
  ValidationError
}
