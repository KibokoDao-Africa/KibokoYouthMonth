exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('product_categorized', function (table) {
      table.increments().primary();
      table.integer('product_id').unsigned().index().references('id').inTable('products').onDelete('restrict').onUpdate('cascade');
      table.integer('category_id').unsigned().index().references('id').inTable('product_category').onDelete('restrict').onUpdate('cascade');
      table.timestamps();
    })
  ])
};
//Rollback migration
exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable('product_categorized')
  ])
};
