
Sets value if it is not defined 

```javascript
const {setDefaults} = require('osmium-tools');
const  params = {x: 10};
setDefaults(params, 'x', 24);
console.log(params); // {x: 10}
setDefaults(params, 'y', 12);
console.log(params); // {x: 10, y: 12}
```