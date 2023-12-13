import Fastify from 'fastify';

import {
  createPostSchema,
  getPostSchema,
  deletePostSchema,
  getPostsSchema,
  updatePostSchema,
} from './schemas';
import { AppDataSource } from './infra/databases/typeorm/data-source';
import PostsTypeORMRepository from './infra/repositories/PostRepository/PostsTypeORMRepository';
import PostsController from './controllers/Posts.controller';

const fastify = Fastify({
  logger: true,
});

const postsRepository = new PostsTypeORMRepository(AppDataSource.manager);
const postsController = new PostsController({ postsRepository });

fastify.get('/posts', { schema: getPostsSchema }, postsController.index);
fastify.post('/posts', { schema: createPostSchema }, postsController.create);
fastify.get('/posts/:id', { schema: getPostSchema }, postsController.get);
fastify.delete(
  '/posts:id',
  { schema: deletePostSchema },
  postsController.destroy
);
fastify.patch(
  '/posts/:id',
  { schema: updatePostSchema },
  postsController.patch
);

export default fastify;
