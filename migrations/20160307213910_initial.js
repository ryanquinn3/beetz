var stringFields = [
    'firstName',
    'lastName',
    'passwordDigest'
];

var USER_TABLE = 'users';

exports.up = function(knex, Promise) {
    return knex.schema.createTable(USER_TABLE, function(table){
        table.increments().primary();
        stringFields.forEach(function(field){
            table.string(field);
        });
        table.string('email').index();
        table.uuid('uuid').index();
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(USER_TABLE);
};
