const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: env("DATABASE_CLIENT", "mysql"),
    connection: {
      host: env("DATABASE_HOST", "127.0.0.1"),
      port: env.int("DATABASE_PORT", 3306),
      database: env("DATABASE_NAME", "test"),
      user: env("DATABASE_USERNAME", "test"),
      password: env("DATABASE_PASSWORD", "test"),
    },
    debug: false,
  },
});
