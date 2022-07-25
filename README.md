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

In your code for connect db:

```javascript
var { crud, info, relate } = require("mongod-relation");

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

// And you can write both these examples in your code there will be no issue recommend
```

## Relation

By this function you can find collection in your first collection in key `gotObjects`

```javascript
relate(object1, object2, relation);
```

## Explane
```bash
`object1` - {
  name:"Your collection name",
  where:{ category:"Programming" }
}
where is optional and this `where` will work exactly like mongodb where work in there find function

`object2` - {
  name:"Your second collection name",
  where:{ category:"Programming" }
}
this is the collection where it find the collectoin that matches and insert in object1.

`relation` - {
  id:"some_id"
}
id is the first collection key
some_id is the second collection key

# or ---

`relation` - {
  "flags.test.id":"id.arr.id"
}
this will search through your arrays and objects, flags can be an array or object
```

git add .
git commit -m 'change in md file'
git push -u origin main