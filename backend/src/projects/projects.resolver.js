const Mutation = {
  createProject: async (parent, args, ctx, info) => {
    const name = args.name;
    const userId = ctx.request.userId;
    if (!name) throw new Error("Name not provided");
    if (!userId) throw new Error("You must be logged in");

    const [project] = await ctx.db('project').returning("*").insert({
      name,
      user_id: userId
    });

    return project;
  },
  updateProject: async (parent, args, ctx, info) => {
    const { id, data } = args;
    const { userId } = ctx.request;

    const [project] = await ctx.db('project').where({
      id,
      user_id: userId
    });

    if (!project) throw new Error("Project not found.");

    if (args.data.user && args.data.user.connect.id !== userId)
      throw new Error("Cannot move the project to other user");

    const [updatedProject] = await ctx.db('project').where({ id: project.id }).returning('*').update({
      ...data
    });

    return updatedProject;
  },
  deleteProject: async (parent, args, ctx, info) => {
    const [project] = await ctx.db('project').where({ id: args.id, user_id: ctx.request.userId });

    if (project) {
      await ctx.db('project').where({ id: project.id }).delete();
    }

    return project;
  }
};

exports.Mutation = Mutation;
