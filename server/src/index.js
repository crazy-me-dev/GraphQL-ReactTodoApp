const dotenv = require("dotenv");
dotenv.config();
const app = require("./utils/server");
const FRONTEND_URL = process.env.FRONTEND_URL;
var port = process.env.PORT || 8080;

app.listen(
  {
    port: port,
    endpoint: "/graphql"
  },
  () => console.log(`Server is running on port ${port}`)
);

module.exports = app;
