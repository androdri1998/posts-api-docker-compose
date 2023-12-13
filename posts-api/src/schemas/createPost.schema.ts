import { FastifySchema } from "fastify";

export const createPostSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["author", "content"],
    properties: {
      author: { type: "string" },
      content: { type: "string" },
    },
  },
};
