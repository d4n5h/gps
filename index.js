const nmea = require("nmea-simple"),
    nmeaOther = require("nmea"),
    SerialPort = require('serialport'),
    Readline = require('@serialport/parser-readline'),
    events = require('events')

module.exports = function (comPort, baudRate) {
    if (!comPort) throw new Error('COM port is required')
    if (!baudRate) throw new Error('Baud rate port is required')
    try {
        this.em = new events.EventEmitter();
        this.port = new SerialPort(comPort, { baudRate: baudRate })
        this.parser = this.port.pipe(new Readline())
    } catch (error) {
        if (error) throw new Error(error)
    }
    this.em.getDevices = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await SerialPort.list())
            } catch (error) {
                reject(error)
            }
        })
    }
    this.parser.on('data', line => {
        try {
            const otherData = nmeaOther.parse(line)
            let data = nmea.parseNmeaSentence(line)
            data.alt = otherData.alt
            data.altUnit = otherData.altUnit
            this.em.emit('data', data)
        } catch (error) {
            // console.log(error)
        }
    })

    this.port.on('close', (err) => {
        this.em.emit('close', err)
    });

    this.port.on('error', (err) => {
        this.em.emit('error', err)
    });

    this.em.close = (cb) => {
        this.port.close(cb)
    }

    return this.em;
}