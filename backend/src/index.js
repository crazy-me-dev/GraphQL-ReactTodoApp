const dotenv = require("dotenv");
dotenv.config();
const server = require("./utils/server");
const FRONTEND_URL = process.env.FRONTEND_URL;

server.start(
  {
    port: 4000,
    endpoint: "/graphql",
    cors: {
      credentials: true,
      origin: FRONTEND_URL
    }
  },
  () => console.log("Server is running on http://localhost:4000")
);

module.exports = server;
