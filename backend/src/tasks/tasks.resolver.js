const Mutation = {
  createTask: async (parent, args, ctx, info) => {
    if (!ctx.request.userId) throw new Error("You must be logged in");
    if (!args.data.project) {
      const [project] = await ctx.db.projects({
        where: { name: "Inbox", user: { id: ctx.request.userId } }
      });
      if (!project) throw new Error("Project not found");
      args.data.project = project.id;
    }

    const task = await ctx.db.createTask({
      ...args.data,
      project: { connect: { id: args.data.project } }
    });

    return task;
  }
};

exports.Mutation = Mutation;
