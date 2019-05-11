const dotenv = require("dotenv");
dotenv.config({ path: "./.env.test" });

// require("babel-register");
require("@babel/register");
require("@babel/polyfill/noConflict");

// const server = require("../../server");

module.exports = async () => {
  // global.httpServer = await server.start({ port: 4004 });
};
