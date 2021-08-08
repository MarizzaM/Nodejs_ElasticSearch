const {createLogger, transports, format} = require('winston')
const ecsFormat = require('@elastic/ecs-winston-format')

const logger = createLogger({
    format: ecsFormat(),
    transports: [
        new transports.File({
        filename: 'info.log',
        level: 'info',
        format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = logger;

