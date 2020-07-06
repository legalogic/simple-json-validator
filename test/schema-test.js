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
  }

  if (exceptionTriggered) {
    t.pass()
  } else {
    t.fail
  }

  t.end()
})

test('object', async (t) => {
  const schema = 'object'
  const value = {}
  validator.validate(schema, value)
  t.pass()
  t.end()
})

test('object - array', async (t) => {
  const schema = 'object'
  const value = []
  validator.validate(schema, value)
  t.pass()
  t.end()
})

test('string', async (t) => {
  const schema = 'string'
  const value = 'bla bla'
  validator.validate(schema, value)
  t.pass()
  t.end()
})

test('boolean', async (t) => {
  const schema = 'boolean'
  const value = true
  validator.validate(schema, value)
  t.pass()
  t.end()
})

test('boolean fail', async (t) => {
  const schema = 'boolean'
  const value = {}
  let exceptionTriggered = false
  try {
    validator.validate(schema, value)  
  } catch (error) {
    exceptionTriggered = true
  }

  if(exceptionTriggered){
    t.pass()
  } else {
    t.fail()
  }
  
  t.end()
})

test('object 1', async (t) => {
  const schema = {
    a: "number",
    b: "string",
    c: "boolean",
    d: "object"
  }
  const value = {
    a: 1,
    b: "bb",
    c: false,
    d: {}
  }

  validator.validate(schema, value)
  t.pass()
  t.end()
})