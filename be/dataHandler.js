const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true });


exports.DatabaseHandler = ()=>{
    let db = undefined;
    let collection = undefined;
    return {
        setUpConnection:async(databaseName)=>{
            await client.connect();
            db = await client.db(databaseName);
        },
        setCollection:async (collectionName)=>{
            collection = await db.collection(collectionName);
        },
        insertObject:async (toInsert)=>{
            let res = await collection.insertOne(toInsert);
        },
        insertArray:async (toInsert)=>{
            await collection.insertMany(toInsert);
        },
        closeDb:async ()=>{
            await client.close();
        },
        query:async (obj)=>{
            return collection.findOne(obj);
        },
        queryAll:async (obj)=>{
            return await collection.find(obj).toArray();
        },
        remove:async (obj)=>{
            return (await collection.deleteOne(obj)).result;
        },
        removeAll:async (obj)=>{
            return (await collection.deleteMany(obj)).result;
        },
        updateAt:async (where,upFields)=>{
            return (await collection.updateOne(where,{$set:upFields})).result;
        }
    }
}