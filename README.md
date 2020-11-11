# gps

## Example:
```javascript
const GPS = require('gps-nmea-reader');

const gps = new GPS('COM12',9600);
(async()=>{
    console.log(await gps.getDevices())
})()
gps.on('data',(data)=>{
    console.log(data)
})
```