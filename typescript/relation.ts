const main2 = require('./dbo')

interface collection {
    name: string,
    where?: object
}




async function relation(collectionName1: collection, collectionName2: collection,): Promise<void> {
    try {
        return await new Promise(async (resolve, reject) => {
            const dbo = await main2.GetDb()
            await dbo.collection(collectionName2.name).find(collectionName2.where).toArray((err: any, res: any) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports=relation