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
const { MongoClient, ServerApiVersion, Double } = require("mongodb");
// var uri: string = '';
var dbName = "test";
var dbo;
var client;
function GetDb(info) {
    return __awaiter(this, void 0, void 0, function* () {
        if (info !== undefined) {
            client = new MongoClient(info.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverApi: ServerApiVersion.v1,
            });
            dbName = info.dbName;
        }
        return yield new Promise((resolve, reject) => {
            if (dbo === undefined) {
                client.connect((err) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        console.log(err);
                    // else console.log("database sconnected successfull");
                    dbo = yield client.db(dbName);
                    resolve(dbo);
                }));
            }
            else {
                resolve(dbo);
            }
        });
    });
}
module.exports = {
    GetDb,
};
