const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const createServer = require("./createServer");

const server = createServer();

server.express.use(cookieParser());

// decode jwt
server.express.use(async (req, res, next) => {
  let { token } = req.cookies;

  if (!token && req.headers.authorization) {
    const header = req.headers.authorization;
    token = header.replace("Bearer ", "");
  }

  if (token) {
    try {
      const { userId } = await jwt.verify(token, process.env.APP_SECRET);
      req.userId = userId;
    } catch (e) {}
  }

  next();
});

module.exports = server;
