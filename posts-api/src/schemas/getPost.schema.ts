import { FastifySchema } from "fastify";

export const getPostSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "number" },
    },
  },
};
