# simple-json-validator

This library helps to validate a simple JSON structure.
It has one method: validate(schema, json)
If the json is valid it returns, otherwise it throws exception with the path to the failed field.

```
const validator = require('simple-json-validator')

validator.validate("number", 3) // true
```


For more examples see tests.



## Types
- string
- number
- boolean
- undefined
- object