const App = require("./app");
const db = require("./dataHandler").DatabaseHandler();

const port = 8095;
const app = App();

app.get("/be/api/users", async (req, res) => {
  res.send({ status: "UTILIZATORI!" });
});

app.post("/be/api/register", async (req, res) => {
  await db.setCollection("Users");
  if ((await db.query({ email: req.body.email })) === null) {
    await db.insertObject(req.body);
    res.send({status:"User already exists!"});
  }
  await db.insertObject(req.body);
  res.send({status:"User added!"});
});

app.post("/be/api/login", async (req, res) => {
  await db.setCollection("Users");
  if(await db.query(req.body) !== null){
      res.setStatusCode(200);
      res.send({status:"Logged in!"});
  }
  res.setStatusCode(400);
  res.send({status:"Password or Username wrong!"});
});

app.listen(port, async () => {
  await db.setUpConnection("PerMa");
  //   await db.setCollection("Useeeri");
  console.log(`Server listening at ${port}`);
});
