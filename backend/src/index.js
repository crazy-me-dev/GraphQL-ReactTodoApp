const dotenv = require("dotenv");
dotenv.config();
const app = require("./utils/server");
const FRONTEND_URL = process.env.FRONTEND_URL;

app.listen(
  {
    port: 4000,
    endpoint: "/graphql"
  },
  () => console.log("Server is running on http://localhost:4000")
);

module.exports = app;
