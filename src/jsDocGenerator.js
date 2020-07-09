// @ts-check

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
  // TODO: complete
  return jsDoc
}

module.exports = { generateJSDoc }
