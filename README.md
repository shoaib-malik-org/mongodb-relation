# mongod-relation

## Quick Links

| what            | where                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| Relation        | [docs.mongodb.com/drivers/node](https://docs.mongodb.com/drivers/node)                                            |
| CRUD            | [mongodb.github.io/node-mongodb-native/](https://mongodb.github.io/node-mongodb-native/)                          |
| npm package     | [www.npmjs.com/package/mongod-relation](https://www.npmjs.com/package/mongod-relation)                            |
| mongod-relation | [www.mongodb.com](https://www.mongodb.com)                                                                        |
| changelog       | [HISTORY.md](https://github.com/mongodb/node-mongodb-native/blob/HEAD/HISTORY.md)                                 |
| upgrade to v4   | [etc/notes/CHANGES_4.0.0.md](https://github.com/mongodb/node-mongodb-native/blob/HEAD/etc/notes/CHANGES_4.0.0.md) |
| contributing    | [CONTRIBUTING.md](https://github.com/mongodb/node-mongodb-native/blob/HEAD/CONTRIBUTING.md)                       |

## Installation

After you've created your own project using `npm init`, you can run:

```bash
npm install mongod-relation
```

In your code:

```javascript
var { crud, info, relation } = require("mongod-relation");

// if you are only going to use single database in your project
info.GetDb({
  uri: "mongodb://localhost:27017",
  dbName: "test",
});

// here you can only use the functions inside the routes
// and you can use multiple database in your project
app.use((req, res, next) => {
  info.GetDb({
    uri: "mongodb://localhost:27017",
    dbName: "test",
  });
  next();
});

// And you can write both other examples in your code there will be no issue
```

git add .
git commit -m 'change in md file'
git push -u origin main
