export const resolvers = {
  Query: {
    users: () => {
      return prisma.user.findMany();
    },
  },
};
