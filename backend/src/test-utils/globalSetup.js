const dotenv = require("dotenv");
dotenv.config({ path: "./.env.test" });

require("@babel/register");
require("@babel/polyfill/noConflict");

const server = require("../utils/server");

module.exports = async () => {};
