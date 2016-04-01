var config = require('config');
var _ = require('underscore');
var knexConfig = {};

knexConfig[ process.env.NODE_ENV || 'development' ] = _(config.dbConfig).extend({
   migrations: {
       tableName: 'knex_migrations'
   }
});

module.exports = knexConfig;
