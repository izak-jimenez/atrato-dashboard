import { builder } from "../graphql/builder.js";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    phone: t.exposeString("phone"),
    name: t.exposeString("name"),
    middleName: t.exposeString("middleName", { nullable: true }),
    fLastName: t.exposeString("fLastName"),
    sLastName: t.exposeString("sLastName", { nullable: true }),
    birthday: t.exposeString("birthday"),
    status: t.expose("status", { type: Status }),
    assignedAnalyst: t.exposeString("assignedAnalyst"),
    card: t.relation("card"),
  }),
});

const Status = builder.enumType("Status", {
  values: ["PENDING", "PROCESSING", "COMPLETED"] as const,
});

builder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.user.findMany({ ...query }),
  })
);

export const UserCreateInput = builder.inputType("UserCreateInput", {
  fields: (t) => ({
    email: t.string({ required: true }),
    phone: t.string({ required: true }),
    name: t.string({ required: true }),
    middleName: t.string({ required: true }),
    fLastName: t.string({ required: true }),
    sLastName: t.string({ required: true }),
    birthday: t.string({ required: true }),
    status: t.field({ type: Status, required: true }),
    assignedAnalyst: t.string({ required: true }),
    cardId: t.int(),
  }),
});

builder.mutationField("createUser", (t) =>
  t.prismaField({
    type: "User",
    args: {
      data: t.arg({
        type: UserCreateInput,
        required: true,
      }),
    },
    resolve: async (query, _parent, args, ctx) => {
      return prisma.user.create({
        ...query,
        data: {
          email: args.data.email,
          phone: args.data.phone,
          name: args.data.name,
          middleName: args.data.middleName,
          fLastName: args.data.fLastName,
          sLastName: args.data.sLastName,
          birthday: args.data.birthday,
          status: args.data.status,
          assignedAnalyst: args.data.assignedAnalyst,
          card: {
            connect: {
              id: (ctx as any).cardId,
            },
          },
        },
      });
    },
  })
);
