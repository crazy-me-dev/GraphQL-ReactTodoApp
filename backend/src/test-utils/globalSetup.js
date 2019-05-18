const dotenv = require("dotenv");
dotenv.config({ path: "./.env.test" });

require("@babel/register");
require("@babel/polyfill/noConflict");

module.exports = async () => {};
