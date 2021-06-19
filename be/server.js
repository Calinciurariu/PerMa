const App = require("./app");
const db = require("./dataHandler").DatabaseHandler();
var mongodb = require("mongodb");
const port = 8095;
const app = App();

app.get("/be/api/users", async (req, res) => {
  await db.setCollection("Users");
  res.send(await db.queryAll());
});

app.post("/be/api/register", async (req, res) => {
  await db.setCollection("Users");
  console.log(req.body);
  if ((await db.query({ email: req.body.email })) !== null) {
    res.setStatusCode(400);
    res.send({ status: "User already exists!" });
  }
  await db.insertObject(req.body);
  res.send({ status: "User added!" });
});

app.post("/be/api/login", async (req, res) => {
  await db.setCollection("Users");
  //   console.log(req.body);
  //   console.log(await db.query(req.body));
  if ((await db.query(req.body)) !== null) {
    res.setStatusCode(200);
    res.send(await db.query(req.body));
  }
  res.setStatusCode(400);
  res.send({ status: "Password or Username wrong!" });
});

app.put("/be/api/updatePassword", async (req, res) => {
  await db.setCollection("Users");
  console.log(req.body);
  if ((await db.query(req.body.where)) !== null) {
    await db.updateAt(req.body.where, req.body.fields);
    res.setStatusCode(200);
    res.send({ status: "Password Changed!" });
  }
  res.setStatusCode(400);
  res.send({ status: "User not found!" });
});

app.post("/be/api/admin/register", async (req, res) => {
  await db.setCollection("Users");
  if ((await db.query({ email: req.body.email })) === null) {
    await db.insertObject(req.body);
    res.setStatusCode(200);
    res.send({ status: "Admin created!" });
  }
  res.setStatusCode(400);
  res.send({ status: "Admin already exists!" });
});

app.get("/be/api/stats/:format", async (req, res) => {
  await db.setCollection("Users");
  let format = req.pathParams["format"];
  if (format === "csv") {
    let content = "Name,Stock\n";
    for (let i = 0; i < 10; i++) {
      content += "Name " + i + "," + Math.random() * 10 + "\n";
    }
    res.send({ data: content });
  } else if (format === "txt") {
    let content = [];
    for (let i = 0; i < 10; i++) {
      content.push({ name: "Name " + i, stock: 10 });
    }
    res.send(content);
  }
  res.setStatusCode(200);
  res.send([]);
});

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

app.get("/be/api/perfumes", async (req, res) => {
  if (db !== null) {
    await db.setCollection("Products");
    let data = await db.queryAll();
    console.log(data);

    res.setStatusCode(200);

    res.send(data);
  }
  res.setStatusCode(400);
  res.send({ status: "DB Error: Can't find the database" });
});

app.post("/be/api/addPerfume", async (req, res) => {
  if (db !== null) {
    await db.setCollection("Products");
    var RandomObject = {
      picture: "http://placehold.it/32x32",
      isActive: true,
      price: "$" + Math.floor(Math.random() * 250 + 50),
      stockAvaliability: Math.floor(Math.random() * 500 + 1),
      name: req.body.name,
      popularity: Math.floor(Math.random() * 10 + 1),
      dateAdded: Date.now(),

      tags: ["culpa", "sit", "esse"],
    };
    await db.insertObject(RandomObject);

    res.setStatusCode(200);

    res.send({ status: "Added a product" });
  }
  res.setStatusCode(400);
  res.send({ status: "DB Error: Can't find the database" });
});

app.get("/be/api/perfume/:id", async (req, res) => {
  await db.setCollection("Products");
  var query = { _id: mongodb.ObjectId(req.pathParams["id"]) };

  var product = await db.query(query);

  if (product !== null) {
    res.setStatusCode(200);
    res.send(product);
  }
  res.setStatusCode(400);
  res.send({ status: "Couldn't find the product :(" });
});

app.listen(port, async () => {
  await db.setUpConnection("PerMa");
  console.log(`Server listening at ${port}`);
});
