const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const uri = "mongodb://localhost:27017/spotify";
const client = new MongoClient(uri);


async function main() {
  try {
    await client.connect();
    const db = client.db();
    const tracks = await db.collection("Track").find(); //Creates collection tracks

    /**
     * Deletes existing collections.
     */
    if (tracks) {
      db.dropDatabase();
    }
    const load = loading("Importing All Track's").start();
    /**
     * Importing JSON file into MongoDB
     */
    const data = await fs.readFile(path.join(__dirname, "spotify.json"), "utf8");
    await db.collection("Track").insertMany(JSON.parse(data));
    




    load.stop();
    
    console.info(`Tracks Imported`);
    process.exit();
  } 
  catch (error) 
  {
    console.error("error:", error);
    process.exit();
  }
}

main();
