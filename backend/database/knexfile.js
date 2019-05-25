module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      port: "5332",
      user: "prisma",
      password: "prisma",
      database: "prisma"
    },
    searchPath: ["default$default"],
    migrations: {
      tableName: "migrations"
    }
  },
  test: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      port: "5332",
      user: "prisma",
      password: "prisma",
      database: "prisma"
    },
    searchPath: ["test$default"],
    migrations: {
      tableName: "migrations"
    }
  }
};
