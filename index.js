// @ts-check
const validator = require('./src/validator')
const jsDocGenerator = require('./src/jsDocGenerator')

module.exports = {
  validate: validator.validate,
  generateJSDoc: jsDocGenerator.generateJSDoc
}
