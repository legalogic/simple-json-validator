// @ts-check

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
})

const test = require('tape')

const validator = require('../validator')

// **************************************************************************************************************
// ******************************************* Unit tests *******************************************************
// **************************************************************************************************************

test('findConditionsById 1', async (t) => {
  const schema = 'number'
  const value = 3
  validator.validate(schema, value)
  t.pass()
  t.end()
})
