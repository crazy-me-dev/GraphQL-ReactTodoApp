module.exports = {
  production: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      ssl: true
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
      port: process.env.POSTGRES_PORT,
      user: "postgres",
      password: process.env.POSTGRES_PASSWORD,
      database: "test"
    },
    searchPath: ["public"],
    migrations: {
      tableName: "migrations"
    }
  }
};
