import { FastifySchema } from "fastify";

export const updatePostSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "number" },
    },
  },
  body: {
    type: "object",
    properties: {
      author: { type: "string" },
      content: { type: "string" },
    },
  },
};
