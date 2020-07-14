// @ts-check

const constants = require('./utils/constants')

/**
 * @typedef {Object} Account
 * @property {Array.<string>} defaultReviewResultsEmailList
 * @property {string} type
 * @property {{type:string, date: number}} solution NEGOTIATE / NON_NEGOTIATE
 * @property {{name:string}} defaultReviewer
 * @property {{
  * isEnabled: string,
  * recipients: Array.<string>
  * body: string
  * }} sendDocViaEmail
  * @property {Array.<string>} bases
  * @property {SLA} sla
  * @property {string} timeZone
  */

const COMMNET_HEADER = '/**'
const COMMNET_FOOTER = '*/'

let _elementId = 0
const getNextId = () => {
  return _elementId++
}

/**
 * @param {string} schema 
 * @returns {string}
 */
const generatePrimitiveJsDoc = (schema) => {
  schema = schema.toLowerCase()
  switch (schema) {
    case constants.type.STRING:
      return 
      break

    // const type = {
    //   STRING: 'string',
    //   NUMBER: 'number',
    //   BOOLEAN: 'boolean',
    //   OBJECT: 'object',
    //   FUNCTION: 'function',
    //   UNDEFINED: 'undefined',
    //   DEFINED: 'defined'
    // }

    default:
      break
  }
  return 'complete'
}

/**
 * @param {Object} schema 
 * @returns {string}
 */
const generateComplexJsDoc = (schema) => {
  return 'complete'
}

/**
 * @param {*} schema 
 * @returns {string}
 */
const generateJSDocRec = (schema) => {
  const schemaType = (typeof schema).toLowerCase()
  switch (schemaType) {
    case constants.type.STRING:
      return generatePrimitiveJsDoc(schema)
    case constants.type.OBJECT:
      return generateComplexJsDoc(schema)
    case constants.type.FUNCTION:
      // TODO: return any
      return ''
    case constants.type.UNDEFINED:
      // TODO: return undefined
      return ''
    default:
      throw new Error(`schema may only be of type string / object / function but was neither. schema is:${schema}`)
  }
}

/**
 * @param {*} schema 
 * @param {string} typeName 
 * @returns {string}
 */
const generateJSDoc = (schema, typeName) => {
  const schemaType = 'object'

  const jsDoc = `
  ${COMMNET_HEADER}\n
  @typedef {${schemaType}} ${typeName}
  ${COMMNET_FOOTER}\n`

  return jsDoc
}

module.exports = {
  generateJSDoc
}
