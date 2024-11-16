
exports.up = function(knex) {
  return Promise.all([
      knex.schema.createTable('product_category', function (table) {
          table.increments();
          table.enum('category',['cereals', 'grains','flour', 'coffee', 'tea']);
          table.timestamps();
      })
  ])
};
//Rollback migration
exports.down = function(knex) {
  return Promise.all([
      knex.schema.dropTable('product_category')
  ])
};
