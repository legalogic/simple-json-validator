// @ts-check

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
})

const test = require('tape')

const validator = require('../index')

// **************************************************************************************************************
// ******************************************* Unit tests *******************************************************
// **************************************************************************************************************

test('any', async (t) => {
  const schema = 'any'
  const value = 3
  validator.validate(schema, value)
  t.pass()
  t.end()
})

test('any 2', async (t) => {
  const schema = 'any'
  const value = [3]
  validator.validate(schema, value)
  t.pass()
  t.end()
})

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

  if (exceptionTriggered) {
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

test('object 2', async (t) => {
  const schema = {
    a: "number",
    b: {
      c1: "string",
      c2: "number",
      c3: "boolean"
    },
    d: "object"
  }
  const value = {
    a: 4,
    b: {
      c1: "sss",
      c2: 44,
      c3: true
    },
    d: { p: 1 }
  }

  validator.validate(schema, value)
  t.pass()
  t.end()
})

test('object 3', async (t) => {
  const schema = {
    a: "number",
    b: {
      c1: {
        e: {
          f: {
            g: "boolean",
            g2: "number",
            g3: "string"
          },
          f2: "string"
        }
      },
      c2: "number",
      c3: "boolean"
    },
    d: "object"
  }

  const value = {
    a: 5.4,
    b: {
      c1: {
        e: {
          f: {
            g: false,
            g2: 31,
            g3: "avc"
          },
          f2: "qqq"
        }
      },
      c2: 99,
      c3: true
    },
    d: null,
    dMissing: {}
  }

  validator.validate(schema, value)
  t.pass()
  t.end()
})

test('object 3 fail', async (t) => {
  const schema = {
    a: "number",
    b: {
      c1: {
        e: {
          f: {
            g: "boolean",
            g2: "number",
            g3: "string"
          },
          f2: "string"
        }
      },
      c2: "number",
      c3: "boolean"
    },
    d: "object"
  }

  const value = {
    a: 5.4,
    b: {
      c1: {
        e: {
          f: {
            g: false,
            g2: "31",
            g3: "avc"
          },
          f2: "qqq"
        }
      },
      c2: 99,
      c3: true
    },
    d: null,
    dMissing: {}
  }

  let errorMsg = ''

  try {
    validator.validate(schema, value)
  } catch (err) {
    errorMsg = err.message
  }

  if (errorMsg.includes('["b","c1","e","f","g2"]')) {
    t.pass()
  } else {
    t.fail()
  }

  t.end()
})

test('object 3 fail 2', async (t) => {
  const schema = {
    a: "number",
    b: {
      c1: {
        e: {
          f: {
            g: "boolean",
            g2: "number",
            g3: "string"
          },
          f2: "string"
        }
      },
      c2: "number",
      c3: "boolean"
    },
    d: "object"
  }

  const value = {
    a: 5.4,
    b: {
      c1: {
        e: {
          f: {
            g: false,
            // g2 missing
            g3: "avc"
          },
          f2: "qqq"
        }
      },
      c2: 99,
      c3: true
    },
    d: null,
    dMissing: {}
  }

  let errorMsg = ''

  try {
    validator.validate(schema, value)
  } catch (err) {
    errorMsg = err.message
  }

  if (errorMsg.includes('["b","c1","e","f","g2"]')) {
    t.pass()
  } else {
    t.fail()
  }

  t.end()
})

test('object 4', async (t) => {
  const schema = {
    1: "string",
    "b": "boolean"
  }
  const value = {
    1: "aaaa",
    "b": false
  }

  validator.validate(schema, value)
  t.pass()
  t.end()
})

test('object 4 fail', async (t) => {
  const schema = {
    1: "string",
    "b": "boolean"
  }
  const value = {
    1: 11,
    "b": false
  }

  let errMsg = ''

  try {
    validator.validate(schema, value)
  } catch (err) {
    errMsg = err.message
  }

  if (errMsg.includes('["1"]')) {
    t.pass()
  } else {
    t.fail()
  }

  t.end()
})

test('array', async (t) => {
  const schema = ['string']
  const value = ['a', 'b', 'c']
  validator.validate(schema, value)
  t.pass()
  t.end()
})

test('nested array', async (t) => {
  const schema = [['number']]
  const value = [[1, 3], [5, 7]]
  validator.validate(schema, value)
  t.pass()
  t.end()
})

test('array fail', async (t) => {
  const schema = ['string']
  const value = ['a', 'b', 3]

  let errMsg = ''

  try {
    validator.validate(schema, value)
  } catch (err) {
    errMsg = err.message
  }

  if (errMsg.includes('[2]')) {
    t.pass()
  } else {
    t.fail()
  }

  t.pass()
  t.end()
})

test('array complex', async (t) => {
  const schema = [{
    a: "string",
    b: "number"
  }]

  const value = [{
    a: "aaa",
    b: 22
  },
  {
    a: "bbb",
    b: 33
  }]

  validator.validate(schema, value)
  t.pass()
  t.end()
})

test('array complex 2', async (t) => {
  const schema = {
    arr: [{
      obj: [{
        a: "number",
        b: "string"
      }]
    }],
    b: "number"
  }

  const value = {
    arr: [
      {
        obj: [{
          a: 66,
          b: "fffff"
        },
        {
          a: 44,
          b: "fsdf",
          c: false // will ignore that
        }]
      },
      {
        obj: [{
          a: 22,
          b: "aaaa"
        },
        {
          a: 445,
          b: "fssdfdf"
        }]
      },
      {
        obj: [{
          a: 88,
          b: "fsdf"
        },
        {
          a: 44222,
          b: "adsfasdf"
        }]
      }
    ],
    b: 88
  }

  validator.validate(schema, value)
  t.pass()
  t.end()
})

test('nullable', async (t) => {
  const schema = {
    'a': "string",
    'b?': "number",
    'b??': "number",
    'c?': "number"
  }

  const value = {
    'a': "aaaa",
    'b?': 77
  }

  validator.validate(schema, value)
  t.pass()
  t.end()
})

test('function', async (t) => {
  const schema = function (value) {
    // do nothing
  }

  const value = {
    'a': "aaaa"
  }

  validator.validate(schema, value)
  t.pass()
  t.end()
})

test('function fail', async (t) => {
  const schema = function (value) {
    throw new Error('*custom failure*')
  }

  const value = {
    'a': "aaaa"
  }

  let errMsg = ''
  try {
    validator.validate(schema, value)
  } catch (err) {
    errMsg = err.message
  }

  if (errMsg.includes('*custom failure*')) {
    t.pass()
  } else {
    t.fail()
  }

  t.end()
})

test('function 2', async (t) => {
  const schema = [
    {
      a: "string",
      b: function (val) {
        if (!val.id) {
          throw new Error('** id missing **')
        }
      }
    }
  ]

  const value = [
    {
      a: "aa",
      b: {
        id: '123'
      }
    },
    {
      a: "bb",
      b: {
        id: '456'
      }
    }
  ]

  validator.validate(schema, value)

  t.pass()
  t.end()
})

test('function 2 fail', async (t) => {
  const schema = [
    {
      a: "string",
      b: function (val) {
        if (!val.id) {
          throw new Error('** id missing **')
        }
      }
    }
  ]

  const value = [
    {
      a: "aa",
      b: {
        id: '123'
      }
    },
    {
      a: "bb",
      b: {
        id: null
      }
    }
  ]

  let errMsg = ''
  try {
    validator.validate(schema, value)
  } catch (err) {
    errMsg = err.message
  }

  if (errMsg.includes('[1,"b"]') && errMsg.includes('** id missing **')) {
    t.pass()
  } else {
    t.fail()
  }

  t.end()
})