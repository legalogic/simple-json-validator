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

/**
 * Supported primitives: string / number / boolean / object
 * @param {*[]} schema 
 * @param {*} value 
 * @param {string[]} path 
 */
const validateArray = (schema, value, path) => {
  // TODO: complete
}

/**
 * Supported primitives: string / number / boolean / object
 * @param {Object} schema 
 * @param {*} obj
 * @param {string[]} path 
 */
const validateObject = (schema, obj, path) => {
  if (!schema) { // schema == null (typeof null is object)
    return
  }

  // at this point schema is an object so value must be an object to pass
  if (!obj ||
    (typeof obj).toLowerCase() != 'object' ||
    Array.isArray(obj)) {
    throw new ValidationError(path)
  }

  // both schema and value are objects
  for (const key of schema) {
    // TODO: support nullable (?)
    const schemaVal = schema[key]
    const field = obj[key]
    path.push(key)
    validateRec(schemaVal, field, path)
    path.pop()
  }
}

/**
 * @param {Object} schema 
 * @param {*} value 
 * @param {string[]} path 
 */
const validateComplex = (schema, value, path) => {
  if (Array.isArray(schema)) {
    validateArray(schema, value, path)
  } else {
    validateObject(schema, value, path)
  }
}

/**
 * Recursively validate value using schema. On error throw exception with the path to the failed field.
 * @param {*} schema 
 * @param {*} value 
 * @param {*} path 
 */
const validateRec = (schema, value, path) => {
  const schemaType = (typeof schema).toLowerCase()
  switch (schemaType) {
    case 'string':
      validatePrimitive(schema, value, path)
      break
    case 'object':
      validateComplex(schema, value, path)
      break
    case 'undefined':
      // do nothing
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
