# gps

## Example:
```javascript
const GPS = require('gps-nmea-reader');

const gps = new GPS('COM12',9600);

gps.on('data',(data)=>{
    console.log(data)
})
```