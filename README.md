# gps

## Example:
```javascript
const GPS = require('gps');

const gps = new GPS('COM12',9600);

gps.on('data',(data)=>{
    console.log(data)
})
```