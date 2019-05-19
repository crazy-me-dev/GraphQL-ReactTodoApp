const jwt = require("jsonwebtoken");
const verifyGoogleToken = require("../utils/verifyGoogle");

const Query = {
  async me(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) throw new Error("You are not logged in.");
    const [user] = await ctx.db.users({ where: { id: userId } });
    return user;
  }
};

const Mutation = {
  async loginWithGoogle(parent, args, ctx, info) {
    const { id_token } = args;
    const googleUser = await verifyGoogleToken(id_token);

    let [user] = await ctx.db.users({
      where: { email: googleUser.email }
    });

    if (!user) {
      user = await ctx.db.createUser({
        name: googleUser.name,
        email: googleUser.email
      });

      // Create the first project automatically for a new user
      await ctx.db.createProject({
        name: "Inbox",
        user: { connect: { id: user.id } }
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
