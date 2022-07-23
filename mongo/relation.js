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
var compile = require("string-template/compile");
function relation(coll1, coll2, where) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (where === undefined) {
                    throw new Error("You must define the two keys for e.g { 'id': 'some _id' }\n see this error docs https://secondhandac.vercel.app");
                }
                const Query1 = QueryMaker(coll1, coll2, where, 'keys');
                const Query2 = QueryMaker(coll1, coll2, where, 'values');
                const data1 = yield crudFunctions.findMany(coll1.name, Query1);
                const data2 = yield crudFunctions.findMany(coll2.name, Query2);
                resolve(RecordsMaker(data1, data2, where));
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
}
function RecordsMaker(data1, data2, where) {
    const keys = Object.keys(where);
    const first = [];
    const sec = [];
    const returnValue = [];
    data1.forEach((value) => {
        first.push(ArrOrObj(value, keys[0]));
    });
    const values = Object.values(where);
    data2.forEach((value) => {
        sec.push(ArrOrObj(value, values[0]));
    });
    data1.forEach((obj1, index) => {
        const arr1 = valueFinder(obj1, { types: first[index].types, seperateKeys: first[index].seperateKeys, lens: first[index].lens });
        data2.forEach((obj2, index2) => {
            const arr2 = valueFinder(obj2, { types: sec[index2].types, seperateKeys: sec[index2].seperateKeys, lens: sec[index2].lens });
            const result = arr1.some(id1 => arr2.some(id2 => id1 === id2));
            if (result) {
                if (keys[0].indexOf('.') === -1) {
                    const id = obj1[keys[0]];
                    obj1[keys[0]] = obj2;
                    obj1[keys[0]][keys[0]] = id;
                }
                else {
                    obj1[keys[0]] = obj2;
                }
                returnValue.push(obj1);
            }
        });
    });
    return returnValue;
    // console.log(first);
    // console.log(sec)
}
function valueFinder(data, where) {
    var func = `data['${where.seperateKeys[0]}']`;
    const isArray = where.types.some((value) => value === 'array');
    if (isArray) {
        var places = 0;
        const value = [];
        if (where.types[0] === 'array') {
            func = func + `[{0}]`;
            value.push(0);
        }
        where.seperateKeys.forEach((key, index) => {
            if (index !== 0) {
                if (where.types[index] === 'array') {
                    func = func + `['${key}'][{${places++}}]`;
                    value.push(0);
                }
                else {
                    func = func + `['${key}']`;
                }
            }
        });
        var finalString = compile(func);
        const finalValues = [];
        for (var i = 0; value[0] < where.lens[0]; i++) {
            const check = Function('data', `return ${finalString(value)}`);
            try {
                finalValues.push(check(data));
            }
            catch (error) {
                // console.log('hell yeah')
            }
            value.forEach((num, index) => {
                if (where.lens[index] === num) {
                    value[index] = 0;
                    if (index !== 0) {
                        value[index - 1]++;
                    }
                }
            });
            value[value.length - 1]++;
        }
        return finalValues;
    }
    else {
        where.seperateKeys.forEach((key, index) => {
            if (index !== 0) {
                func = func + `['${key}']`;
            }
        });
        const check = Function('data', `return ${func}`);
        return [check(data)];
    }
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
    var lens = [];
    seperateKeys.forEach((value, index) => {
        const check = Function('data', `return ${func}`);
        const val = check(data);
        if (typeof val === 'object' && val.length === undefined) {
            func = func + `['${seperateKeys[index + 1]}']`;
            types.push('object');
        }
        else if (typeof val === 'object' && val.length !== undefined) {
            lens.push(val.length);
            func = func + `[0]['${seperateKeys[index + 1]}']`;
            types.push('array');
        }
        else {
            types.push('end');
        }
    });
    return { types, seperateKeys, lens };
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
        Query = { $and: [] };
        console.log(Query['$and'][0]);
        keys.forEach(value => {
            Query['$and'].push({ [value]: { $not: { $type: 'object' } } });
            Query['$and'].push({ [value]: { $exists: true } });
        });
    }
    else {
        // console.log(Object.keys())
        Query = { $and: [] };
        Query['$and'].push(collWhere);
        keys.forEach(value => {
            Query['$and'].push({ [value]: { $not: { $type: 'object' } } });
            Query['$and'].push({ [value]: { $exists: true } });
        });
    }
    return Query;
}
module.exports = relation;
