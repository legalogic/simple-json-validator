// @ts-check

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
})

const test = require('tape')

const validator = require('../validator')

// **************************************************************************************************************
// ******************************************* Unit tests *******************************************************
// **************************************************************************************************************

test('number', async (t) => {
  const schema = 'number'
  const value = 3
  validator.validate(schema, value)
  t.pass()
  t.end()
})

test('number fail', async (t) => {
  const schema = 'number'
  const value = 'a'
  let exceptionTriggered = false
  try {
    validator.validate(schema, value)  
  } catch {
    exceptionTriggered = true
    t.pass()  
  }

  if(!exceptionTriggered){
    t.fail()
  }
  
  t.end()
})