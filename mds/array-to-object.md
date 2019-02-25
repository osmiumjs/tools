
Creates an Object out of an Array

__Usage__
```javascript
const {arrayToObject} = require('osmium-tools');
const arr = ['x', 'y', 'z'];
console.log(arrayToObject(arr)); // {'x': 1, 'y': 2, 'z': 3}
console.log(arrayToObject(arr, true)); // {'1': 'x', '2': 'y', '3': 'z'} 
```