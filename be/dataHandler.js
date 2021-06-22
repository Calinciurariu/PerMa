const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://MakeTheGrade:HDB07abc@permacluster.jiotd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const collection = client.db("PerMa").collection("Users");
    //console.log(collection);
    //client.close();
  });
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
        queryLastN:async (obj)=>{
            return await collection.find(obj).sort({_id: 1});
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