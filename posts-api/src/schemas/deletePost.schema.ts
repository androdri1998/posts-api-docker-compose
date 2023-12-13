import { FastifySchema } from "fastify";

export const deletePostSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "number" },
    },
  },
};
