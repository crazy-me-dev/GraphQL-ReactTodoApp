exports.up = function(knex) {
  return knex.schema.table("user", table => {
    table.boolean("is_demo_account").default(false);
  });
};

exports.down = function(knex) {
  return knex.schema.table("user", table => {
    table.dropColumn("is_demo_account");
  });
};
