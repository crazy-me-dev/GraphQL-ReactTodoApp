import server from "../utils/server.js";

export const startTestServer = async () => {
  global.httpServer = await server.listen({ port: 4004 });
};

export const closeTestServer = async () => {
  await global.httpServer.close();
};
