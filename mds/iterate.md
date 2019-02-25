
Iterates through an *Object* *Array* or *number*
  
_Example_
```javascript
const {iterate, delay} = require('osmium-tools');

let dt = {x: 10, y: 20};
iterate(dt,  (value, key) => {
	console.log(value, key) // 10 'x' ... 20 'y'
})
iterate([1, 2, 3], async (value, index) => {
	await delay(100);
	console.log(value,  index); // 1 0 ... 2 1 ... 3 2
})
```

Values, returned in callbacks can be accumulated

_Example_
```javascript
const {iterate, delay} = require('osmium-tools');
let arr = iterate({x: 10, y: 20}, (val) => {
	return val * 2;	
}, []);
console.log(arr) // [20, 40]
``` 

