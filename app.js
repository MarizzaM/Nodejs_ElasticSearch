  
const elasticSearch = require('elasticsearch')

const client = new elasticSearch.Client({
    host: 'localhost:9200',
    pingTimeout: 3000
})

client.ping({}, async function (error) {
    if (error) {
        console.log('Upss.. ' + error)
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
            console.log(`createdResult`, createdResult)
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
        console.log(`object`, hits.hits)


    const updatedRecord = await client.update({
        index: 'searches', id: 101, body: {
            doc: {
                quote: 'bla-bla-bla'
            }
        }
    })
    console.log(`updatedRecord`, updatedRecord)

    const deletedRecord = await client.delete({ index: 'searches', id: 104 })
        console.log(`deletedRecord`, deletedRecord)

    }
})


