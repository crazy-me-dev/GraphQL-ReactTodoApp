exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("user", table => {
      table.increments("id");
      table.string("name");
      table.string("email").unique();
      table.timestamps(false, true);
    })
    .createTable("project", table => {
      table.increments("id");
      table.string("name");
      table
        .integer("user_id")
        .unsigned()
        .references("user.id")
        .onDelete('CASCADE');
      table.timestamps(false, true);
    })
    .createTable("task", table => {
      table.increments("id");
      table
        .integer("project_id")
        .unsigned()
        .references("project.id")
        .onDelete('CASCADE');
      table.boolean("done").default(false);
      table.string("description");
      table.timestamps(false, true);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable("task")
    .dropTable("project")
    .dropTable("user");
};
