const { crud, info, relate } = require('./mongo/index')
const express = require('express')
const fetch = require("node-fetch")
const shortid = require('shortid');

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

app.get("/", async (req, res) => {
    const p = await fetch('https://v2.jokeapi.dev/joke/Any')
    const data = await p.json();
    data.first_id = shortid.generate()
    crud.insertOne('test', data).then((check) => { console.log(check) })
    res.json({ msg: "hell yeah" })
})




relate(
    { name: 'check' },
    { name: "test" },
    )
    .then((result) => { console.log(result) })
    .catch((err) => { console.log(err) })


// mongo.insertMany('check', [{ name: 'someone' }]).then((check) => { console.log(check) })

// crud.findMany('check').then((result) => { console.log(result) })
// crud.findOne('check', { name: 'someone' }).then((result) => { console.log(result) })
// mongo.updateOne('check', { gender: 'transgender' }, { name: "suhail" }).then((result) => { console.log(result) })
// mongo.replaceOne("check", { name: "suhail" }, { gender: 'transgender' }).then((result) => { console.log(result) })
// crud.deleteOne('check', { name:"someone" }).then((result) => { console.log(result) })
// mongo.deleteMany('check', { name:"someone" }).then((result) => { console.log(result) })

