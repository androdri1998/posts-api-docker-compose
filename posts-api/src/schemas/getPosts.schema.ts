import { FastifySchema } from "fastify";

export const getPostsSchema: FastifySchema = {
  querystring: {
    type: "object",
    properties: {
      page: { type: "number", default: 1 },
      limit: { type: "number", default: 5 },
    },
  },
};
