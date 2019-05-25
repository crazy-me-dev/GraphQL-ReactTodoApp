const jwt = require("jsonwebtoken");
const verifyGoogleToken = require("../utils/verifyGoogle");

const Query = {
  async me(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) throw new Error("You are not logged in.");
    const user = await ctx
      .db("user")
      .where("id", userId)
      .first();
    return user;
  }
};

const Mutation = {
  async loginWithGoogle(parent, args, ctx, info) {
    const { id_token } = args;
    const googleUser = await verifyGoogleToken(id_token);

    let user = await ctx
      .db("user")
      .where("email", googleUser.email)
      .first();

    if (!user) {
      [user] = await ctx
        .db("user")
        .returning("*")
        .insert({
          name: googleUser.name,
          email: googleUser.email
        });

      await ctx.db("project").insert({
        name: "Inbox",
        user_id: user.id
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return user;
  },
  logOut(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "Goodbye!" };
  }
};

exports.Query = Query;
exports.Mutation = Mutation;
