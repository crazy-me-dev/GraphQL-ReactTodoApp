const dotenv = require("dotenv");
dotenv.config();
const server = require("./utils/server");
const FRONTEND_URL = process.env.FRONTEND_URL;

server.listen(
  {
    port: 4000,
    endpoint: "/graphql"
  },
  () => console.log("Server is running on http://localhost:4000")
);

module.exports = server;
