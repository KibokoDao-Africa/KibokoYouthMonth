exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('traded_items', function (table) {
      table.increments().primary();
      table.integer('order_id').unsigned().index().references('id').inTable('orders').onDelete('restrict').onUpdate('cascade');
      table.integer('seller_id').unsigned().index().references('id').inTable('seller').onDelete('restrict').onUpdate('cascade');
      table.integer('product_id').unsigned().index().references('id').inTable('products').onDelete('restrict').onUpdate('cascade');
      table.enum('payment_mode',['bitcoin','ether', 'credit card', 'amex', 'mastercard', 'visa']);
      table.enum('status',['escrowed','paid', 'returned', 'active', 'pending']);
      table.timestamps();
    })
  ])
};
//Rollback migration
exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable('traded_items')
  ])
};
