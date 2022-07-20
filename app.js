// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   readline.question(`What's your name?`, name => {
//     console.log(`Hi ${name}!`);
//     readline.close();
//   });

const { crud, info, relate } = require('./mongo/index')
const express = require('express')
const app = express();
app.listen(8000, (err) => {
    console.log('server has been started')
})

const first = require("./check")
app.use('/check', first)

info.GetDb({
    uri: "mongodb+srv://shoaibMalik:Katiya12@shoaibscluster.qgqoe.mongodb.net/?retryWrites=true&w=majority",
    dbName: "test"
})

// app.use((req, res, next) => {
//     info.GetDb({
//         uri: "mongodb+srv://shoaibMalik:Katiya12@shoaibscluster.qgqoe.mongodb.net/?retryWrites=true&w=majority",
//         dbName: "check"
//     })
//     next();
// })



app.get("/", (req, res) => {
    
    res.json({ msg: "hell yeah" })
})

relate({ name: 'check' }, { name: "check", where: { name: "someone" } }).then((result) => { console.log(result) }).catch((err) => { console.log(err) })

// mongo.insertMany('check', [{ name: 'someone' }]).then((check) => { console.log(check) })
// crud.insertOne('check', { name: 'someone' }).then((check) => { console.log(check) })
// crud.findMany('check').then((result) => { console.log(result) })
// crud.findOne('check', { name: 'someone' }).then((result) => { console.log(result) })
// mongo.updateOne('check', { gender: 'transgender' }, { name: "suhail" }).then((result) => { console.log(result) })
// mongo.replaceOne("check", { name: "suhail" }, { gender: 'transgender' }).then((result) => { console.log(result) })
// crud.deleteOne('check', { name:"someone" }).then((result) => { console.log(result) })
// mongo.deleteMany('check', { name:"someone" }).then((result) => { console.log(result) })

