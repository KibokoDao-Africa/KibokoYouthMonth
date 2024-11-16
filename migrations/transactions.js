exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('transactions', function (table) {
      table.increments().primary();
      table.string('reference_no',1000).collate('utf8mb4_unicode_ci');
      table.integer('user_id').unsigned().index().references('id').inTable('users').onDelete('restrict').onUpdate('cascade');
      table.integer('amount', 100).unsigned();
      table.enum('mode',['bitcoin','ether', 'visa', 'master card', 'paypal', 'amex', 'aga', 'credit card']);
      table.string('destination',100).collate('utf8mb4_unicode_ci');
      table.string('explanation',500).collate('utf8mb4_unicode_ci');
      table.timestamps();
    })
  ])
};
//Rollback migration
exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable('transactions')
  ])
};
