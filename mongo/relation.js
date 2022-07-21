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
        }
        catch (error) {
            console.log(error);
        }
    });
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
