const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const createServer = require("./createServer");

const app = express();
const server = createServer();

app.use(cookieParser());

// decode jwt
app.use(async (req, res, next) => {
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

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
});

module.exports = app;
