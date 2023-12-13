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
import CreatePostService from './services/CreatePost.service';
import DeletePostService from './services/DeletePost.service';
import GetPostService from './services/GetPost.service';
import GetPostsService from './services/GetPosts.service';
import UpdatePostService from './services/UpdatePost.service';

const fastify = Fastify({
  logger: true,
});

const postsRepository = new PostsTypeORMRepository(AppDataSource.manager);
const createPostService = new CreatePostService({ postsRepository });
const deletePostService = new DeletePostService({ postsRepository });
const getPostService = new GetPostService({ postsRepository });
const getPostsService = new GetPostsService({ postsRepository });
const updatePostService = new UpdatePostService({ postsRepository });

const postsController = new PostsController({
  postsRepository,
  createPostService,
  deletePostService,
  getPostService,
  getPostsService,
  updatePostService,
});

fastify.get('/posts', { schema: getPostsSchema }, postsController.index);
fastify.post('/posts', { schema: createPostSchema }, postsController.create);
fastify.get('/posts/:id', { schema: getPostSchema }, postsController.get);
fastify.delete(
  '/posts/:id',
  { schema: deletePostSchema },
  postsController.destroy
);
fastify.patch(
  '/posts/:id',
  { schema: updatePostSchema },
  postsController.patch
);

export default fastify;
