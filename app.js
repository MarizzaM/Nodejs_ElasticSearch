  

const elasticSearch = require('elasticsearch')
const logger = require('./logger')

const client = new elasticSearch.Client({
    host: 'localhost:9200',
    pingTimeout: 3000
})

const winston = require('winston')
const ecsFormat = require('@elastic/ecs-winston-format')

// const logger = winston.createLogger({
//     level: 'info',
//     format: ecsFormat(), 
//     transports: [
//       new winston.transports.Console()
//     ]
//   })

client.ping({}, async function (error) {
    if (error) {
        console.log('Oops.. ' + error)
    } else {
        console.log('connected')

        const DATA = [
            {
                name: 'Albert Einstein',
                quote: 'If you want to live a happy life, tie it to a goal, not to people or things'
            },
            {
                name: 'Babe Ruth',
                quote: 'Never let the fear of striking out keep you from playing the game'
            },
            {
                name: 'Eleanor Roosevelt',
                quote: 'If life were predictable it would cease to be life, and be without flavor'
            },
            {
                name: 'Helen Keller',
                quote: 'Life is a succession of lessons which must be lived to be understood.'
            },
            {
                name: 'Robert Frost',
                quote: 'In three words I can sum up everything I’ve learned about life: It goes on'
            }
        ] 
        
        DATA.forEach(async (item, index) => {
            const createdResult = await client.index({
                index: 'searches',
                type: 'search',
                id: index + 100,
                body: item
            })
            // logger.info("new item created successful", createdResult)
            logger.log('info', "new item created successful", createdResult)
            // console.log(`createdResult`, createdResult)

        });

        const { hits } = await client.search({
            index: 'searches',
            type: 'search',
            body: {
                query: {
                    match: {
                        name: 'Babe Ruth'
                    }
                }
            }
        })
        // logger.info("result", hits.hits)
        logger.log('info', "result", hits.hits)
        // console.log(`object`, hits.hits)


    const updatedRecord = await client.update({
        index: 'searches', id: 101, body: {
            doc: {
                quote: 'bla-bla-bla'
            }
        }
    })
    // logger.info("item updated successful", updatedRecord)
    logger.log('info', "item updated successful", updatedRecord)
    // console.log(`updatedRecord`, updatedRecord)

    const deletedRecord = await client.delete({ index: 'searches', id: 104 })
        // logger.info("item deleted successful", deletedRecord)
        logger.log('info', "item deleted successful", deletedRecord)
        // console.log(`deletedRecord`, deletedRecord)

    }
})
