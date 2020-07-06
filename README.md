# simple-json-validator

This library helps to validate a simple JSON structure.
It has one method: validate(schema, json)
If the json is valid it returns, otherwise it throws exception with the path to the failed field.

```js script
const validator = require('simple-json-validator')
// primitives
validator.validate("number", 3) // true
validator.validate("number", "3") // exception
validator.validate("string", "3") // true
validator.validate("boolean", false) // true
validator.validate("object", {}) // true

// objects
validator.validate({num : "number"}, {num: 3}) // true
validator.validate({num : "number", "opt?": "string"}, {num: 3}) // true 
// optional fields end with '?'. 
// if there is an actual field that ends with '?' we can make it optional by adding an additional '?' ('opt??')

// arrays
validator.validate([{num : "number"}], [{num: 3}, {num: 5}]) // true

// custom
validator.validate([{num : function(val){ 
  if(typeof val !== 'number'){
    throw new Error('not a number')
  }
}}], [{num: 3}, {num: "5"}]) // throws exception on the second element

```

For more examples see tests.
