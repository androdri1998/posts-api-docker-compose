import Fastify from "fastify";

import {
  createPostSchema,
  getPostSchema,
  deletePostSchema,
  getPostsSchema,
  updatePostSchema,
} from "./schemas";

const fastify = Fastify({
  logger: true,
});

fastify.get("/posts", { schema: getPostsSchema }, (request, reply) => {
  reply.send({ message: "get many posts-api" });
});

fastify.post("/posts", { schema: createPostSchema }, (request, reply) => {
  reply.send({ message: "post posts-api" });
});

fastify.get("/posts/:id", { schema: getPostSchema }, (request, reply) => {
  reply.send({ message: "get one posts-api" });
});

fastify.delete("/posts:id", { schema: deletePostSchema }, (request, reply) => {
  reply.send({ message: "delete posts-api" });
});

fastify.patch("/posts/:id", { schema: updatePostSchema }, (request, reply) => {
  reply.send({ message: "update posts-api" });
});

export default fastify;
