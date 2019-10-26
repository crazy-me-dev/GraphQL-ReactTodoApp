const dotenv = require("dotenv");

const path = process.env.NODE_ENV
  ? `../env.${process.env.NODE_ENV}`
  : `../.env`;

dotenv.config({ path, debug: true });

module.exports = require("./knexfile");
