
Grabs all values / keys from object and creates and *Array* from them

__Usage__
```javascript
const {objectToArray} = require('osmium-tools');
let obj = {x: 10, y: 20};
console.log(objectToArray(obj)); // [10, 20]
console.log(objectToArray(obj,  true)) // ['x', 'y']
```