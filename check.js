const express = require('express')
const router = express.Router();
const { crud, info } = require("./mongo/index")


// router.use((req, res, next) => {
//     info.GetDb({
//         uri: "mongodb+srv://shoaibMalik:Katiya12@shoaibscluster.qgqoe.mongodb.net/?retryWrites=true&w=majority",
//         dbName: "check"
//     })
//     next();
// })


router.get("/", (req, res) => {
    res.send("hell yeah")
    crud.findOne('check', { name: 'someone' }).then((result) => { console.log(result) })
})


module.exports = router;