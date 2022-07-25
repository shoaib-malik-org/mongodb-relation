# mongod-relation

## Quick Links

| what            | where                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| Relation        | [docs.mongodb.com/drivers/node](https://docs.mongodb.com/drivers/node)                                            |
| CRUD            | [mongodb.github.io/node-mongodb-native/](https://mongodb.github.io/node-mongodb-native/)                          |
| Mongodb         | [mongodb.github.io/node-mongodb-native/](https://mongodb.github.io/node-mongodb-native/)                          |
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

## CRUD

By these functions you can find,insert,update,delete and replace collection in your collections

```javascript
// find
crud.findOne("collection name", { name: "john" });
crud.findMany("collection name", { category: "Programming" });
// # or --
crud.findMany("collection name");

// insert
var object = { name: "john", age: 19 };
var array = [
  { name: "john", age: 19 },
  { name: "tom", age: 20 },
];

crud.insertOne("collection name", object);
// # or --
crud.insertOne("collection name", { name: "john", age: 19 });

crud.insertMany("collection name", array);
// # or --
crud.insertMany("collection name", [
  { name: "john", age: 19 },
  { name: "tom", age: 20 },
]);

// delete
crud.deleteOne("collection name", { name: "john" }); // it will only delete one collection
crud.deleteMany("collection name", { name: "john" }); // it wiil delete the collections where the condition matche

// update
crud.updateOne("collection name", { name: "john" }, { name: "carter" }); // it will only update one collection
crud.updateMany("collection name", { name: "john" }, { name: "carter" }); // it will update record where the condition matches
```
## Next Steps

- [MongoDB Documentation](https://docs.mongodb.com/manual/)
- [Star us on GitHub](https://github.com/mongodb/node-mongodb-native)