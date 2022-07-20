const main = require('./dbo')

async function insertMany(collectionName: string, array: readonly object[]): Promise<void> {
    try {
        return await new Promise(async (resolve, reject) => {
            const dbo = await main.GetDb()
            await dbo.collection(collectionName).insertMany(array, (err: any, res: any) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    } catch (error) {
        console.log(error)
    }
}

async function insertOne(collectionName: string, obj: object): Promise<void> {
    try {
        return await new Promise(async (resolve, reject) => {
            const dbo = await main.GetDb()
            await dbo.collection(collectionName).insertOne(obj, (err: any, res: any) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    } catch (error) {
        console.log(error)
    }
}

async function findMany(collectionName: string, where: object): Promise<void> {
    try {
        var setWhere: object = {};
        if (where !== undefined && typeof where === 'object') {
            setWhere = where
        }
        return await new Promise(async (resolve, reject) => {
            const dbo = await main.GetDb()
            await dbo.collection(collectionName).find(setWhere).toArray((err: any, res: any) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    } catch (error) {
        console.log(error)
    }
}

async function findOne(collectionName: string, where: object): Promise<void> {
    try {
        var setWhere: object = {};
        if (where !== undefined && typeof where === 'object') {
            setWhere = where
        }
        return await new Promise(async (resolve, reject) => {
            const dbo = await main.GetDb()
            await dbo.collection(collectionName).findOne(setWhere, (err: any, res: any) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    } catch (error) {
        console.log(error)
    }
}

async function updateOne(collectionName: string, where: object, what: object): Promise<void> {
    try {
        var set: object;
        if (where === undefined) throw "Mention where you want to update your record"
        if (what === undefined) throw "Mention what you want to update in your record"
        if ("$set" in what) {
            set = what;
        } else if (!("$set" in what)) {
            set = { $set: { ...what } }
        }
        return await new Promise(async (resolve, reject) => {
            const dbo = await main.GetDb()
            await dbo.collection(collectionName).updateOne(where, set, (err: any, res: any) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    } catch (error) {
        console.log(error)
    }
}

async function updateMany(collectionName: string, where: object, what: object): Promise<void> {
    try {
        var set: object;
        if (where === undefined) throw "Mention where you want to update your record"
        if (what === undefined) throw "Mention what you want to update in your record"
        if ("$set" in what) {
            set = what;
        } else if (!("$set" in what)) {
            set = { $set: { ...what } }
        }
        return await new Promise(async (resolve, reject) => {
            const dbo = await main.GetDb()
            await dbo.collection(collectionName).updateMany(where, set, (err: any, res: any) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    } catch (error) {
        console.log(error)
    }
}

async function replaceOne(collectionName: string, where: object, what: object): Promise<void> {
    try {
        if (where === undefined) throw "Mention where you want to update your record"
        if (what === undefined) throw "Mention what you want to update in your record"
        var setWhere: object = {};
        if (where !== undefined && typeof where === 'object') {
            setWhere = where
        }
        return await new Promise(async (resolve, reject) => {
            const dbo = await main.GetDb()
            await dbo.collection(collectionName).replaceOne(where, setWhere, (err: any, res: any) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    } catch (error) {
        console.log(error)
    }
}

async function deleteOne(collectionName: string, where: object): Promise<void> {
    try {
        if (where === undefined) throw "Mention what record you want to delete"
        return await new Promise(async (resolve, reject) => {
            const dbo = await main.GetDb()
            await dbo.collection(collectionName).deleteOne(where, (err: any, res: any) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    } catch (error) {
        console.log(error)
    }
}

async function deleteMany(collectionName: string, where: object): Promise<void> {
    try {
        if (where === undefined) throw "Mention what record you want to delete"
        return await new Promise(async (resolve, reject) => {
            const dbo = await main.GetDb()
            await dbo.collection(collectionName).deleteMany(where, (err: any, res: any) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    insertMany,
    insertOne,
    findOne,
    findMany,
    updateOne,
    updateMany,
    replaceOne,
    deleteOne,
    deleteMany
};