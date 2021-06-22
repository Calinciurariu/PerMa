const App = require("./app");
const db = require("./dataHandler").DatabaseHandler();
var mongodb = require("mongodb");
const port = 8095;
const app = App();

app.get("/be/api/users", async (req, res) => {
  if (db !== null) {
    console.log("called get on all users");

    await db.setCollection("Users");
    res.setStatusCode(200);

    res.send(await db.queryAll());
  } else {
    res.setStatusCode(400);
    res.send({ status: "DB Error: Can't find the database" });
  }
});

app.get("/be/api/shipment/:id", async (req, res) => {
  await db.setCollection("Shipments");
  console.log(req.pathParams["id"]);
  var query = { _id: req.pathParams["id"]  };
  var product = await db.query(query); 
  
  if(product!== null){
    res.setStatusCode(200);
    res.send(product);
  }
  else{
    res.setStatusCode(400);
    res.send({status:"Couldn't find it. Sorry :("});
  }
});


app.get ("/be/api/deliveries/:id", async (req,res)=>{

  await db.setCollection("Shipments");
  console.log(req.pathParams["id"]);
  var query = { shipmentsUsername:req.pathParams["id"] };
  var product = await db.queryAll(query); 
  
  if(product!== null){
    res.setStatusCode(200);
    res.send(product);
  }
  else{
    res.setStatusCode(400);
    res.send({status:"Couldn't find anything. Perhaps the username is wrong?"});
  }

});

app.get("/be/api/shipments",async (req,res)=>{
  if (db!==null){
      await db.setCollection("Shipments");
      res.setStatusCode(200);

      res.send(await db.queryAll());
    }
    else{
      res.setStatusCode(400);
      res.send({status:"DB Error: Can't find the database"});
    }
});

 app.get("/be/api/perfumes",async (req,res)=>{
      if (db!==null){
          await db.setCollection("Products");
          res.setStatusCode(200);

          res.send(await db.queryAll());
        }
        else{
          res.setStatusCode(400);
          res.send({status:"DB Error: Can't find the database"});
        }
});

app.get("/be/api/newestPerfumes",async (req,res)=>{
  if (db!==null){
      await db.setCollection("Products");
      res.setStatusCode(200);

      res.send(await db.queryLastN());
    }
    else{
      res.setStatusCode(400);
      res.send({status:"DB Error: Can't find the database"});
    }
});

app.post("/be/api/register", async (req, res) => {
  await db.setCollection("Users");
  console.log(req.body);
  if ((await db.query({ email: req.body.email })) !== null) {
    res.setStatusCode(400);
    res.send({ status: "User already exists!" });
  } else {
    await db.insertObject(req.body);
    res.send({ status: "User added!" });
  }
});

app.post("/be/api/login", async (req, res) => {
  await db.setCollection("Users");
    console.log(req.body);
  if (await db.query(req.body) !== null) {
    res.setStatusCode(200);
    res.send(await db.query(req.body));
  } else {
    res.setStatusCode(400);
    res.send({ status: "Password or Username wrong!" });
  }
});

app.put("/be/api/updatePassword", async (req, res) => {
  await db.setCollection("Users");
  console.log(req.body);
  if ((await db.query(req.body.where)) !== null) {
    await db.updateAt(req.body.where, req.body.fields);
    res.setStatusCode(200);
    res.send({ status: "Password Changed!" });
  } else {
    res.setStatusCode(400);
    res.send({ status: "User not found!" });
  }
});

app.post("/be/api/admin/register", async (req, res) => {
  await db.setCollection("Users");
  if ((await db.query({ email: req.body.email })) === null) {
    await db.insertObject(req.body);
    res.setStatusCode(200);
    res.send({ status: "Admin created!" });
  } else {
    res.setStatusCode(400);
    res.send({ status: "Admin already exists!" });
  }
});
app.get("/be/api/perfume/:id", async (req, res) => {
  await db.setCollection("Products");
  console.log(req.pathParams["id"]);
  var query = { _id: mongodb.ObjectId(req.pathParams["id"])  };
  var product = await db.query(query); 
  
  if(product!== null){
    res.setStatusCode(200);
    res.send(product);
  }
  else{
    res.setStatusCode(400);
    res.send({status:"Couldn't find the product :("});
  }
});

app.get("/be/api/searchPerfumes/:id",async (req,res)=>{
  if (db!=null){
    await db.setCollection("Products");
    var queryString =decodeURI(req.pathParams["id"]);
    //probably not the smartest Search API
    var query = { "name": queryString};
    var query2 = { name: { $regex : ".*"+ queryString +".*", $options:'i' } };
    var query3 ={ name: { $regex :  queryString +".*", $options:'i' } };
    var query4 = { name: { $regex : ".*"+ queryString , $options:'i' } };

    var authorQuery = { "designer": queryString};
    var authorQuery2 = { designer: { $regex : ".*"+ queryString +".*", $options:'i' } };
    var authorQuery3 ={ designer: { $regex :  queryString +".*", $options:'i' } };
    var authorQuery4 = { designer: { $regex : ".*"+ queryString , $options:'i' } };
  //  var product = await db.queryAll(query3||query4||query2||authorQuery||authorQuery2||authorQuery3||authorQuery4||query);
    var product = await db.queryAll( {$or: [query3,query4,query2,authorQuery,authorQuery2,authorQuery3,authorQuery4,query]} );

    if(product!== null){
      res.setStatusCode(200);
      res.send(product);
    }
    else{
      res.setStatusCode(404);
      res.send({status:"Couldn't find the product :("});
    }
  }
  else {
    res.setStatusCode(400);
    res.send({status:"Server error :("});
  }
});

app.get("/be/api/stats/:format", async (req, res) => {
  await db.setCollection("Users");
  let format = req.pathParams["format"];
  if (format === "csv") {
    let content = "Name,Stock\n";
    for (let i = 0; i < 10; i++) {
      content += "Name " + i + "," + Math.random() * 10 + "\n";
    }
  } else {
    res.setStatusCode(200);
    res.send([]);
  }
});

//we didn't need uuidv anymore. We thought about having a GUID for each product/user
// function uuidv4() {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
// }

app.post("/be/api/addPerfume",async (req,res)=>{
 
  if (db!==null){
      await db.setCollection("Products");
      var ReqObject = {
        picture: "http://placehold.it/32x32",
        isActive: true,
        price: req.body.price,
        stockAvaliability: req.body.stockAvaliability,
        name: req.body.name,
        designer: req.body.designer,
        popularity: 8,   //start with basic popularity of 8/10
        dateAdded:  Date.now(),
       
        tags: req.body.tags
    } ;
      await db.insertObject(ReqObject);

 

    res.setStatusCode(200);

    res.send({ status: "Added a product" });
  } else {
    res.setStatusCode(400);
    res.send({ status: "DB Error: Can't find the database" });
  }
});


app.listen(port, async () => {
  await db.setUpConnection("PerMa");
  console.log(`Server listening at ${port}`);
});
