const main2 = require('./dbo')
const crudFunctions = require("./crud")
var compile = require("string-template/compile")


interface collection {
    name: string,
    where?: object
}


async function relation(coll1: collection, coll2: collection, where: any) {
    try {
        return await new Promise(async (resolve, reject) => {
            if (where === undefined) {
                throw new Error("You must define the two keys for e.g { 'id': 'some_id' }\n see this error docs https://secondhandac.vercel.app");
            }
            var Query1, data1;
            var Query2, data2;
            if (coll1.name === undefined) {
                data1 = coll1
            } else {
                Query1 = QueryMaker(coll1, coll2, where, 'keys')
                data1 = await crudFunctions.findMany(coll1.name, Query1)
            }
            if (coll2.name === undefined) {
                data2 = coll2
            } else {
                Query2 = QueryMaker(coll1, coll2, where, 'values')
                data2 = await crudFunctions.findMany(coll2.name, Query2)
            }
            resolve(RecordsMaker(data1, data2, where))
        })
    } catch (error) {
        console.log(error)
    }
}

function RecordsMaker(data1: any[], data2: any[], where: object) {
    const keys = Object.keys(where)
    const first: any[][] = [];
    const sec: any[][] = [];
    const returnValue: object[] = []
    var arr1: any = []
    var arr2: any = []
    var chk: boolean = false;
    data1.forEach((value, data1Index) => {
        first.push([])
        keys.forEach((key) => {
            first[data1Index].push(ArrOrObj(value, key))
        })
    })
    const values = Object.values(where)
    data2.forEach((value, data2Index) => {
        sec.push([])
        values.forEach((val) => {
            sec[data2Index].push(ArrOrObj(value, val))
        })
    })
    data1.forEach((obj1, index) => {
        arr1 = []
        obj1["gotObjects"] = []
        chk = false;
        first[index].forEach((firstValue, firstIndex) => {
            arr1.push(valueFinder(obj1, { types: firstValue.types, seperateKeys: firstValue.seperateKeys, lens: firstValue.lens }))
        })
        data2.forEach((obj2, index2) => {
            arr2 = []
            sec[index2].forEach((secValue, secIndex) => {
                arr2.push(valueFinder(obj2, { types: secValue.types, seperateKeys: secValue.seperateKeys, lens: secValue.lens }))
            })
            const result = arr1.every((element: any, arr1Index: any) => {
                const bool = element.some((firstKey: any) => {
                    return arr2[arr1Index].some((secondKey: any) => {
                        return firstKey === secondKey
                    })
                })
                return bool
            })
            if (result) {
                chk = true;
                obj1["gotObjects"].push(obj2)
            }
        })
        if (chk) {
            returnValue.push(obj1)
        }
    })
    return returnValue
}

function valueFinder(data: object, where: { types: string[], seperateKeys: string[], lens: number[] }): any[] {
    var func: string = `data['${where.seperateKeys[0]}']`;
    const isArray = where.types.some((value) => value === 'array')
    var places: number = 0
    if (isArray) {
        const value: number[] = []
        if (where.types[0] === 'array') {
            places++
            func = func + `[{0}]`
            value.push(0)
        }
        where.seperateKeys.forEach((key, index) => {
            if (index !== 0) {
                if (where.types[index] === 'array') {
                    func = func + `['${key}'][{${places++}}]`
                    value.push(0)
                } else {
                    func = func + `['${key}']`
                }
            }
        })
        var finalString = compile(func)
        const finalValues: any[] = []
        for (var i = 0; value[0] < where.lens[0]; i++) {
            const check = Function('data', `return ${finalString(value)}`)
            try {
                finalValues.push(check(data))
            } catch (error) {
                // console.log('Yo bro whatsapp')
            }
            value.forEach((num, index) => {
                if (where.lens[index] === num) {
                    value[index] = -1
                    if (index !== 0) {
                        value[index - 1]++
                    }
                }
            })
            value[value.length - 1]++
        }
        return finalValues
    } else {
        where.seperateKeys.forEach((key, index) => {
            if (index !== 0) {
                func = func + `['${key}']`
            }
        })
        const check = Function('data', `return ${func}`)
        return [check(data)]
    }
}

function ArrOrObj(data: any, query: string) {
    const indexs: number[] = [];
    const seperateKeys: string[] = [];
    for (var i = 0; i < query.length; i++) {
        if (query[i] === '.') indexs.push(i)
    }
    seperateKeys.push(query.slice(0, indexs[0]))
    for (var i = 0; i < indexs.length; i++) {
        seperateKeys.push(query.slice(indexs[i] + 1, indexs[i + 1]))
    }
    var func: string = `data['${seperateKeys[0]}']`;
    var types: string[] = [];
    var lens: number[] = [];
    seperateKeys.forEach((value, index) => {
        const check = Function('data', `return ${func}`)
        const val = check(data)
        if (typeof val === 'object' && val.length === undefined) {
            func = func + `['${seperateKeys[index + 1]}']`
            types.push('object')
        } else if (typeof val === 'object' && val.length !== undefined) {

            lens.push(val.length)
            func = func + `[0]['${seperateKeys[index + 1]}']`
            types.push('array')
        } else {
            types.push('end')
        }
    })
    return { types, seperateKeys, lens }
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
    Query = { $and: [] }
    if (collWhere !== undefined) {
        Query['$and'].push(collWhere)
    }
    keys.forEach(value => {
        Query['$and'].push({ [value]: { $not: { $type: 'object' } } })
        Query['$and'].push({ [value]: { $exists: true } })
    })
    return Query
}

module.exports = relation