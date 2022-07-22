"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const main2 = require('./dbo');
const crudFunctions = require("./crud");
function relation(coll1, coll2, where) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (where === undefined) {
                throw new Error("You must define the two keys for e.g { 'id': 'first_id' }\n see this error docs https://secondhandac.vercel.app");
            }
            const Query1 = QueryMaker(coll1, coll2, where, 'keys');
            const Query2 = QueryMaker(coll1, coll2, where, 'values');
            const data1 = yield crudFunctions.findMany(coll1.name, Query1);
            const data2 = yield crudFunctions.findMany(coll2.name, Query2);
            RecordsMaker(data1, data2, where);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function RecordsMaker(data1, data2, where) {
    // console.log(data1.length,data2.length,where)
    const values = Object.values(where);
    ArrOrObj(data2[0], values[0]);
    // console.log(data1[0]['flags']['nsfw'])
}
function ArrOrObj(data, query) {
    const indexs = [];
    const seperateKeys = [];
    for (var i = 0; i < query.length; i++) {
        if (query[i] === '.')
            indexs.push(i);
    }
    seperateKeys.push(query.slice(0, indexs[0]));
    for (var i = 0; i < indexs.length; i++) {
        seperateKeys.push(query.slice(indexs[i] + 1, indexs[i + 1]));
    }
    var func = `data['${seperateKeys[0]}']`;
    var types = [];
    seperateKeys.forEach((value, index) => {
        console.log(func);
        const check = Function('data', `return ${func}`);
        const val = check(data);
        if (typeof val === 'object' && val.length === undefined) {
            func = func + `['${seperateKeys[index + 1]}']`;
            types.push('object');
        }
        else if (typeof val === 'object' && val.length !== undefined) {
            func = func + `[0]['${seperateKeys[index + 1]}']`;
            types.push('array');
        }
        else {
            types.push('end');
        }
    });
    console.log(types);
    // console.log(types)
    // const check = Function("return 5")
    // console.log(data[0]['test'])
}
function QueryMaker(coll1, coll2, where, know) {
    var keys;
    var collWhere;
    if (know === 'keys') {
        keys = Object.keys(where);
        collWhere = coll1.where;
    }
    else if (know === 'values') {
        keys = Object.values(where);
        collWhere = coll2.where;
    }
    else {
        keys = [];
    }
    var Query;
    if (collWhere === undefined) {
        Query = { $and: [], };
        keys.forEach(value => {
            Query['$and'].push({ [value]: { $exists: true } });
        });
    }
    else {
        // console.log(Object.keys())
        Query = { $and: [], };
        Query['$and'].push(collWhere);
        keys.forEach(value => {
            Query['$and'].push({ [value]: { $exists: true } });
        });
    }
    return Query;
}
module.exports = relation;
