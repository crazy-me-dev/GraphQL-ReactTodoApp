const Mutation = {
  createProject: async (parent, args, ctx, info) => {
    const name = args.name;
    const userId = ctx.request.userId;
    if (!name) throw new Error("Name not provided");
    if (!userId) throw new Error("You must be logged in");

    const project = await ctx.db.createProject({
      name,
      user: { connect: { id: userId } }
    });
    return project;
  },
  updateProject: async (parent, args, ctx, info) => {
    const { id, data } = args;
    const { userId } = ctx.request;

    const [project] = await ctx.db.projects({
      where: {
        id,
        user: { id: userId }
      }
    });

    if (!project) throw new Error("Project not found.");

    const updatedProject = await ctx.db.updateProject({
      data,
      where: { id: project.id }
    });

    return updatedProject;
  },
  deleteProject: async (parent, args, ctx, info) => {
    const [project] = await ctx.db.projects({
      where: {
        id: args.id,
        user: { id: ctx.request.userId }
      }
    });

    if (project) {
      await ctx.db.deleteProject({ id: project.id });
    }

    return project;
  }
};

exports.Mutation = Mutation;
