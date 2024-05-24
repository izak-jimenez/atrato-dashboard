import { builder } from "../graphql/builder.js";

builder.prismaObject("Card", {
  fields: (t) => ({
    id: t.exposeID("id"),
    number: t.exposeString("number"),
    type: t.exposeString("type"),
    cvv: t.exposeString("cvv"),
    pin: t.exposeString("pin"),
    expiration: t.expose("expiration", { type: "Date" }),
  }),
});

builder.queryField("card", (t) =>
  t.prismaField({
    type: "Card",
    resolve: async (query, _parent, _args, _ctx, _info) =>
      prisma.card.findFirstOrThrow({
        ...query,
        where: { id: (_ctx as any).id },
      }),
  })
);

export const CardCreateInput = builder.inputType("CardCreateInput", {
  fields: (t) => ({
    number: t.string({ required: true }),
    type: t.string({ required: true }),
    cvv: t.string({ required: true }),
    pin: t.string({ required: true }),
    expiration: t.field({ type: "Date", required: true }),
  }),
});

builder.mutationField("createCard", (t) =>
  t.prismaField({
    type: "Card",
    args: {
      data: t.arg({
        type: CardCreateInput,
        required: true,
      }),
    },
    resolve: async (query, _parent, args, ctx) => {
      return prisma.card.create({
        ...query,
        data: {
          number: args.data.number,
          type: args.data.type,
          cvv: args.data.cvv,
          pin: args.data.pin,
          expiration: args.data.expiration,
        },
      });
    },
  })
);
