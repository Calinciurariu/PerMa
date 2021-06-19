const App = require("./app");
const db = require("./dataHandler").DatabaseHandler();

const port = 8095;
const app = App();

app.get("/be/api/users",async (req,res)=>{
    res.send({status:"UTILIZATORI!"});
});

app.listen(port, async () => {
//   await db.setUpConnection("Database");
//   await db.setCollection("Useeeri");
  console.log(`Server listening at ${port}`);
});
