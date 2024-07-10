require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ut3bwdk.mongodb.net/?appName=Cluster0`;
const dbName = process.env.DB_NAME;
let db;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function mongoConnect() {
  if (!db) {
    try {
      // Connect the client to the server
      await client.connect();

      db = client.db(dbName);
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } catch (err) {
      console.log(err);
    }
  }
  return db;
}

module.exports = mongoConnect;
