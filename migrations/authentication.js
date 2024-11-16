exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('authentication', function (table) {
      table.increments().primary();
      table.integer('user_id').unsigned().index().references('id').inTable('users').onDelete('restrict').onUpdate('cascade');
      table.string('email',254).unique();
      table.integer('expiration', 10).unsigned();
      table.string('token',1000).collate('utf8mb4_unicode_ci');
      table.tinyint('used').unsigned();
      table.datetime('createdAt');
      table.datetime('updatedAt');
    })
  ])
};
//Rollback migration
exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable('authentication')
  ])
};
