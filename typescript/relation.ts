const main2 = require('./dbo')
const crudFunctions = require("./crud")


interface collection {
    name: string,
    where?: object
}


async function relation(coll1: collection, coll2: collection, where: any): Promise<void> {
    try {
        if (where === undefined) {
            throw new Error("You must define the two keys for e.g { 'id': 'first_id' }\n see this error docs https://secondhandac.vercel.app");
        }
        const Query1 = QueryMaker(coll1, coll2, where, 'keys')
        const Query2 = QueryMaker(coll1, coll2, where, 'values')
        const data1 = await crudFunctions.findMany(coll1.name, Query1)
        const data2 = await crudFunctions.findMany(coll2.name, Query2)
    } catch (error) {
        console.log(error)
    }
}

function QueryMaker(coll1: collection, coll2: collection, where: any, know: string): object {
    var keys: string[];
    var collWhere: any;

    if (know === 'keys') {
        keys = Object.keys(where)
        collWhere = coll1.where
    }
    else if (know === 'values') {
        keys = Object.values(where)
        collWhere = coll2.where
    }
    else {
        keys = []
    }
    var Query: { $and: object[] };
    if (collWhere === undefined) {
        Query = { $and: [], }
        keys.forEach(value => {
            Query['$and'].push({ [value]: { $exists: true } })
        })
    } else {
        // console.log(Object.keys())
        Query = { $and: [], }
        Query['$and'].push(collWhere)
        keys.forEach(value => {
            Query['$and'].push({ [value]: { $exists: true } })
        })
    }
    return Query
}

module.exports = relation