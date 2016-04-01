import knex from 'knex';
import config from 'config';

let pageConfig = config.dbConfig;

export default knex(pageConfig);