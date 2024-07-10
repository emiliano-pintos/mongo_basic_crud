const express = require("express");
const fs = require("fs");
const router = express.Router();
const removeExtension = require("../utils/utils");

const PATH_ROUTES = __dirname;

fs.readdirSync(PATH_ROUTES).filter((file) => {
  const filename = removeExtension(file);
  filename !== "index"
    ? router.use(`/${filename}`, require(`./${file}`))
    : () => {
        throw Error;
      };
});

module.exports = router;
