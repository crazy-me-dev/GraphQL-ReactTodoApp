const createUser = async (ctx, args) => {
  const [user] = await ctx
    .db("user")
    .returning("*")
    .insert(args);

  await ctx.db("project").insert({
    name: "Inbox",
    user_id: user.id
  });

  return user;
};

module.exports = {
  createUser
};
