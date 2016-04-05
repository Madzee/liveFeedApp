var winston = require('winston');


winston.add(
    winston.transports.File, {
        filename: 'ServerDebug.log',
        level: 'info',
        json: false,        
        timestamp: true
    }
)

module.exports = winston;

