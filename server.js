const { db } = require("./db");
const app = require("./app");
const redis = require("./redis");
const confgs = require("./configs");

async function startSever() {
  try {
    await db.authenticate();
    await redis.ping();

    app.listen(confgs.port, () => {
      console.log(`Server Running on port ${confgs.port}`);
    });
  } catch (error) {
    console.log(error);
    await db.close();
    await redis.disconnect();
  }
}

startSever();
