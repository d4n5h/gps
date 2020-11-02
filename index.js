const nmea = require("nmea"),
    SerialPort = require('serialport'),
    Readline = require('@serialport/parser-readline'),
    events = require('events')

module.exports = function (comPort, baudRate) {
    if (!comPort) throw new Error('COM port is required')
    if (!baudRate) throw new Error('Baud rate port is required')
    this.em = new events.EventEmitter();
    this.port = new SerialPort(comPort, { baudRate: baudRate })
    this.parser = port.pipe(new Readline())
    this.parser.on('data', line => {
        try {
            const data = nmea.parse(line)
            this.em.emit('data', data)
        } catch (error) {
            // console.log(error)
        }
    })
    return em;
}