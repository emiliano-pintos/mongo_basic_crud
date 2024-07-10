require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoConnect = require("./config/mongo");
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/", require("./routes/index.routes"));

mongoConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server ready on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });
