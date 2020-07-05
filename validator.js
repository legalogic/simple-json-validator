// @ts-check
const { ValidationError } = require('./utils/errors')

/**
 * Supported primitives: string / number / boolean / object
 * @param {string} schema 
 * @param {*} value 
 * @param {string[]} path 
 */
const validatePrimitive = (schema, value, path) => {
  schema = schema.toLowerCase()
  const valType = (typeof value).toLowerCase()
  if (valType != schema) {
    throw new ValidationError(path)
  }
}

const validateRec = (schema, value, path) => {
  const schemaType = (typeof schema).toLowerCase()
  switch (schemaType) {
    case 'string':
      validatePrimitive(schema, value, path)
      break
    case 'object':
      // TODO: complete
      break
    default:
      throw new Error(`schema may only be of type string or object but was neither. schema is:${schema}`)
  }
}

const validate = (schema, value) => {
  validateRec(schema, value, [])
}

module.exports = {
  validate
}
