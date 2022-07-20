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
const main = require('./dbo');
function insertMany(collectionName, array) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const dbo = yield main.GetDb();
                yield dbo.collection(collectionName).insertMany(array, (err, res) => {
                    if (err)
                        reject(err);
                    else
                        resolve(res);
                });
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
}
function insertOne(collectionName, obj) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const dbo = yield main.GetDb();
                yield dbo.collection(collectionName).insertOne(obj, (err, res) => {
                    if (err)
                        reject(err);
                    else
                        resolve(res);
                });
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
}
function findMany(collectionName, where) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var setWhere = {};
            if (where !== undefined && typeof where === 'object') {
                setWhere = where;
            }
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const dbo = yield main.GetDb();
                yield dbo.collection(collectionName).find(setWhere).toArray((err, res) => {
                    if (err)
                        reject(err);
                    else
                        resolve(res);
                });
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
}
function findOne(collectionName, where) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var setWhere = {};
            if (where !== undefined && typeof where === 'object') {
                setWhere = where;
            }
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const dbo = yield main.GetDb();
                yield dbo.collection(collectionName).findOne(setWhere, (err, res) => {
                    if (err)
                        reject(err);
                    else
                        resolve(res);
                });
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
}
function updateOne(collectionName, where, what) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var set;
            if (where === undefined)
                throw "Mention where you want to update your record";
            if (what === undefined)
                throw "Mention what you want to update in your record";
            if ("$set" in what) {
                set = what;
            }
            else if (!("$set" in what)) {
                set = { $set: Object.assign({}, what) };
            }
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const dbo = yield main.GetDb();
                yield dbo.collection(collectionName).updateOne(where, set, (err, res) => {
                    if (err)
                        reject(err);
                    else
                        resolve(res);
                });
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
}
function updateMany(collectionName, where, what) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var set;
            if (where === undefined)
                throw "Mention where you want to update your record";
            if (what === undefined)
                throw "Mention what you want to update in your record";
            if ("$set" in what) {
                set = what;
            }
            else if (!("$set" in what)) {
                set = { $set: Object.assign({}, what) };
            }
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const dbo = yield main.GetDb();
                yield dbo.collection(collectionName).updateMany(where, set, (err, res) => {
                    if (err)
                        reject(err);
                    else
                        resolve(res);
                });
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
}
function replaceOne(collectionName, where, what) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (where === undefined)
                throw "Mention where you want to update your record";
            if (what === undefined)
                throw "Mention what you want to update in your record";
            var setWhere = {};
            if (where !== undefined && typeof where === 'object') {
                setWhere = where;
            }
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const dbo = yield main.GetDb();
                yield dbo.collection(collectionName).replaceOne(where, setWhere, (err, res) => {
                    if (err)
                        reject(err);
                    else
                        resolve(res);
                });
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
}
function deleteOne(collectionName, where) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (where === undefined)
                throw "Mention what record you want to delete";
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const dbo = yield main.GetDb();
                yield dbo.collection(collectionName).deleteOne(where, (err, res) => {
                    if (err)
                        reject(err);
                    else
                        resolve(res);
                });
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
}
function deleteMany(collectionName, where) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (where === undefined)
                throw "Mention what record you want to delete";
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const dbo = yield main.GetDb();
                yield dbo.collection(collectionName).deleteMany(where, (err, res) => {
                    if (err)
                        reject(err);
                    else
                        resolve(res);
                });
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
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
