# mongod-relation

## Installation

After you've created your own project using `npm init`, you can run:

```bash
npm install mongod-relation
```

In your code for connect db:

```javascript
var { crud, info, relate } = require("mongod-relation");

// Currently you can only use one database
// we are working on multiple database
info.GetDb({
  uri: "mongodb://localhost:27017",
  dbName: "test",
});
```

## Relation

By this function you can find collection in your first collection in key `gotObjects`

```javascript
await relate(object1, object2, relation);
await relate({ name: "john", id: 1 }, { name: "carter", id: 1 }, { id: "id" });
// You can directly pass the object to compare by their keys
```

## Explane

```bash
`object1` - {
  name: "Your collection name",
  where: { category: "Programming" }
}
where is optional and this `where` will work exactly like mongodb where work in there find function

`object2` - {
  name: "Your second collection name",
  where: { category: "Programming" }
}
this is the collection where it find the collectoin that matches and insert in object1.

`relation` - {
  id: "some_id"
}
id is the first collection key
some_id is the second collection key

# or ---

`relation` - {
  "flags.test.id": "id.arr.id"
}
this will search through your arrays and objects, flags can be an array or object
```

## Code example

- [example](https://github.com/shoaib-malik-org/mongod-relation-example)

## CRUD

By these functions you can find,insert,update,delete and replace collection in your collections

```javascript
// find
await crud.findOne("collection name", { name: "john" });
await crud.findMany("collection name", { category: "Programming" });
// # or --
await crud.findMany("collection name");

// insert
var object = { name: "john", age: 19 };
var array = [
  { name: "john", age: 19 },
  { name: "tom", age: 20 },
];

await crud.insertOne("collection name", object);
// # or --
await crud.insertOne("collection name", { name: "john", age: 19 });

await crud.insertMany("collection name", array);
// # or --
await crud.insertMany("collection name", [
  { name: "john", age: 19 },
  { name: "tom", age: 20 },
]);

// delete
await crud.deleteOnue("collection name", { name: "john" }); // it will only delete one collection
await crud.deleteMany("collection name", { name: "john" }); // it wiil delete the collections where the condition matche

// update
await crud.updateOne("collection name", { name: "john" }, { name: "carter" }); // it will only update one collection
await crud.updateMany("collection name", { name: "john" }, { name: "carter" }); // it will update record where the condition matches
```

## Next Steps

- [Star us on GitHub](https://github.com/shoaib-malik-org/mongodb-relation)
