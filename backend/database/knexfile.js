module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      port: "3332",
      user: "postgres",
      password: "secret",
      database: "postgres"
    },
    searchPath: ["public"],
    migrations: {
      tableName: "migrations"
    }
  },
  test: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      port: "3332",
      user: "postgres",
      password: "secret",
      database: "test"
    },
    searchPath: ["public"],
    migrations: {
      tableName: "migrations"
    }
  }
};
