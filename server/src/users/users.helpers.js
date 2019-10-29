const jwt = require("jsonwebtoken");

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

const signUserIn = (ctx, user) => {
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  ctx.res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365
  });
};

module.exports = {
  createUser,
  signUserIn
};
