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
function relation(collectionName1, collectionName2) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const dbo = yield main2.GetDb();
                yield dbo.collection(collectionName2.name).find(collectionName2.where).toArray((err, res) => {
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
module.exports = relation;
