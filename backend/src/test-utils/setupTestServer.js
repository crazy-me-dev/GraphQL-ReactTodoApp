import db from "../utils/db";
import server from "../utils/server.js";

export const startTestServer = done => {
  global.httpServer = server.listen({ port: 4004 }, done);
};

export const closeTestServer = done => {
  db.destroy();
  global.httpServer.close(done);
};
