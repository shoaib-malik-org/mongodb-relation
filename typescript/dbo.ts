const { MongoClient, ServerApiVersion, Double } = require("mongodb");
// var uri: string = '';
var dbName: string = "test";


var dbo: any;
var client: any;
async function GetDb(info?: { uri: string, dbName: string }): Promise<void> {
    if (info !== undefined) {
        client = new MongoClient(info.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });
        dbName = info.dbName
    }
    return await new Promise((resolve, reject) => {
        if (dbo === undefined) {
            client.connect(async (err: any) => {
                if (err) console.log(err);
                // else console.log("database sconnected successfull");
                dbo = await client.db(dbName)
                resolve(dbo)
            });
        } else {
            resolve(dbo)
        }
    })
}

module.exports = {
    GetDb,
}