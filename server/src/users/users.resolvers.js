const bcrypt = require("bcryptjs");

const { createUser, signUserIn } = require("./users.helpers");
const verifyGoogleToken = require("../utils/verifyGoogle");

const Query = {
  async me(parent, args, ctx, info) {
    const { userId } = ctx.req;

    if (!userId) throw new Error("You are not logged in.");
    const user = await ctx
      .db("user")
      .where("id", userId)
      .first();
    return user;
  }
};

const User = {
  projects: async (user, args, ctx, info) => {
    return await ctx
      .db("project")
      .where("user_id", user.id)
      .orderBy("order_number", "asc");
  }
};

const Mutation = {
  async registerNewUser(parent, args, ctx, info) {
    const { email, password, name, termsAccepted } = args;
    let [user] = await ctx.db("user").where("email", email);

    if (!termsAccepted) {
      throw new Error("You have to accept the terms!");
    }

    if (password.length < 6) {
      throw new Error("Password should be at least 6 characters long!");
    }

    if (user) {
      throw new Error("You have already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(ctx, {
      name,
      email,
      password: hashedPassword
    });

    signUserIn(ctx, newUser);

    return newUser;
  },

  async loginWithCredentials(parent, args, ctx, info) {
    const { email, password } = args;

    if (!password || !email) {
      throw new Error("You must provide both email and password!");
    }

    const [user] = await ctx.db("user").where("email", email);
    const validPassword = await bcrypt.compare(password, user.password);

    if (!user || !validPassword) {
      throw new Error("Given credentials are incorrect!");
    }

    signUserIn(ctx, user);

    return user;
  },

  async loginWithGoogle(parent, args, ctx, info) {
    const { id_token } = args;
    const googleUser = await verifyGoogleToken(id_token);

    let [user] = await ctx.db("user").where("email", googleUser.email);

    if (!user) {
      user = await createUser(ctx, googleUser);
    }

    signUserIn(ctx, user);

    return user;
  },
  logOut(parent, args, ctx, info) {
    ctx.res.clearCookie("token");
    return { message: "Goodbye!" };
  }
};

exports.User = User;
exports.Query = Query;
exports.Mutation = Mutation;
