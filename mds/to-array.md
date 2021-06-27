
Creates *Array* from value or leaves it unchanged if it is already an *Array*

__Usage__
```javascript
const {toArray} = require('@osmium/tools');
let value = "value";
console.log(toArray(value)); // ["value"]
let arrVal = [1, 2, 3];
console.log(toArray(arrVal)); // [1, 2, 3]
```
