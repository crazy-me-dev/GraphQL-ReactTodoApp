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
  },
  updateTask: async (parent, args, ctx, info) => {
    if (!ctx.request.userId) throw new Error("You must be logged in");
    if (
      args.data.project &&
      args.data.project.connect.id !== ctx.request.userId
    )
      throw new Error("Cannot move task to project you don't own");
    const [task] = await ctx.db.tasks({
      where: {
        id: args.id,
        project: {
          user: {
            id: ctx.request.userId
          }
        }
      }
    });

    if (!task) throw new Error("Task not found");

    const updatedTask = await ctx.db.updateTask({
      data: { ...args.data },
      where: { id: args.id }
    });
    return updatedTask;
  },
  deleteTask: async (parent, args, ctx, info) => {
    if (!ctx.request.userId) throw new Error("You must be logged in");
    const [task] = await ctx.db.tasks({
      where: {
        id: args.id,
        project: {
          user: {
            id: ctx.request.userId
          }
        }
      }
    });
    if (!task) throw new Error("Task not found");

    return await ctx.db.deleteTask({ id: args.id });
  }
};

exports.Mutation = Mutation;
