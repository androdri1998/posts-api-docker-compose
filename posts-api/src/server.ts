import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

fastify.get("/", (request, reply) => {
  reply.send({ message: "posts-api running" });
});

export default fastify;
