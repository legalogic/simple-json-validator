// @ts-check

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
})

const test = require('tape')

const validator = require('../index')

// **************************************************************************************************************
// ******************************************* Unit tests *******************************************************
// **************************************************************************************************************

test('jsdoc basic', async (t) => {
  const schema = 'number'
  const jsDoc = validator.generateJSDoc(schema, 'MyNumber')
  console.log(jsDoc)
  
  t.pass()
  t.end()
})
