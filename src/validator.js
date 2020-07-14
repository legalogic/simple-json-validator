// @ts-check
const { ValidationError } = require('./utils/errors')
const constants = require('./utils/constants')

/**
 * Supported primitives: string / number / boolean / object 
 * @param {string} schema 
 * @param {*} value 
 * @param {(string | number)[]} path 
 */
const validatePrimitive = (schema, value, path) => {
  schema = schema.toLowerCase()
  if (schema === constants.type.DEFINED) {
    if (typeof value === constants.type.UNDEFINED) {
      throw new ValidationError(path)
    }
    return // value is defined (can be null)
  }
  const valType = (typeof value).toLowerCase()
  if (valType != schema) {
    throw new ValidationError(path)
  }
}

/**
 * @param {*[]} schema 
 * @param {*} arr 
 * @param {(string | number)[]} path 
 */
const validateArray = (schema, arr, path) => {
  if (!Array.isArray(arr)) {
    throw new ValidationError(path)
  }

  const schemaVal = schema[0] // could be undefined
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i]
    path.push(i)
    validateRec(schemaVal, val, path)
    path.pop()
  }
}

/**
 * Returns the schema field. Will be different from key only if it is nullable (ends with '?') and doesn't exist as is in obj
 * @param {string} key 
 * @param {*} obj 
 */
const getSchemaField = (key, obj) => {
  if (!key || typeof key != constants.type.STRING || !key.endsWith('?')) {
    return { objField: key, nullable: false }
  }

  // key ends with '?'
  if (obj[key]) {
    return { objField: key, nullable: false }
  }

  const strippedKey = key.substring(0, key.length - 1)
  return { objField: strippedKey, nullable: true }
}

/**
 * @param {Object} schema 
 * @param {*} obj
 * @param {(string | number)[]} path 
 */
const validateObject = (schema, obj, path) => {
  if (!schema) { // schema == null (typeof null is object)
    return
  }

  // at this point schema is an object so value must be an object to pass
  if ((typeof obj).toLowerCase() != constants.type.OBJECT ||
    Array.isArray(obj)) {
    throw new ValidationError(path)
  }

  // both schema and value are objects
  for (const key of Object.keys(schema)) {
    const { objField, nullable } = getSchemaField(key, obj)

    const schemaVal = schema[key]
    const objVal = obj[objField]

    if (nullable && !objVal) {
      continue
    }

    path.push(objField)
    validateRec(schemaVal, objVal, path)
    path.pop()
  }
}

/**
 * @param {Object} schema 
 * @param {*} value 
 * @param {(string | number)[]} path 
 */
const validateComplex = (schema, value, path) => {
  if (Array.isArray(schema)) {
    validateArray(schema, value, path)
  } else {
    validateObject(schema, value, path)
  }
}

/**
 * @param {Function} func a function that receives a value and throws and exception if value not validated (returns otherwise)
 * @param {*} value 
 * @param {(string | number)[]} path 
 */
const validateCustomFunction = (func, value, path) => {
  try {
    func(value)
  } catch (err) {
    throw new ValidationError(path, err.message)
  }
}

/**
 * Recursively validate value using schema. On error throw exception with the path to the failed field.
 * @param {*} schema 
 * @param {*} value 
 * @param {(string | number)[]} path 
 */
const validateRec = (schema, value, path) => {
  const schemaType = (typeof schema).toLowerCase()
  switch (schemaType) {
    case constants.type.STRING:
      validatePrimitive(schema, value, path)
      break
    case constants.type.OBJECT:
      validateComplex(schema, value, path)
      break
    case constants.type.FUNCTION:
      validateCustomFunction(schema, value, path)
      break
    case constants.type.UNDEFINED:
      // do nothing
      break
    default:
      throw new Error(`schema may only be of type string / object / function but was neither. schema is:${schema}`)
  }
}

const validate = (schema, value) => {
  validateRec(schema, value, [])
}

module.exports = {
  validate
}
