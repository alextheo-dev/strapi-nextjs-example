const cronTasks = require('./cron-tasks');

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('STRAPI_PORT', 1337),
  cron: {
    enabled: true,
    tasks: cronTasks
  },
  app: {
    keys: env.array('APP_KEYS',['app_key']),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  url: env('STRAPI_URL', ''),
});
