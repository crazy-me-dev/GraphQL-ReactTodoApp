exports.up = function(knex, Promise) {
  return knex.schema
    .table("project", table => {
      table
        .integer("order_number")
        .notNull()
        .after("user_id")
        .default(0);
    })
    .table("task", table => {
      table
        .integer("order_number")
        .after("description")
        .notNull()
        .default(0);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .table("project", table => {
      table.dropColumn("order_number");
    })
    .table("task", table => {
      table.dropColumn("order_number");
    });
};
