import { FastifyReply } from 'fastify';
import * as PostsControllerTypes from './dto/Posts.controller.dto';
import { PostsRepository } from '../repositories/PostsRepository';

class PostsController implements PostsController {
  postsRepository: PostsRepository;

  constructor({
    postsRepository,
  }: PostsControllerTypes.PostsControllerConstructor) {
    this.postsRepository = postsRepository;

    this.create = this.create.bind(this);
    this.index = this.index.bind(this);
    this.get = this.get.bind(this);
    this.patch = this.patch.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  async create(
    request: PostsControllerTypes.CreatePostRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    return reply.send({ message: 'post posts-api' });
  }

  async index(
    request: PostsControllerTypes.GetPostsRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    return reply.send({ message: 'get many posts-api' });
  }

  async get(
    request: PostsControllerTypes.GetPostRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    return reply.send({ message: 'get posts-api' });
  }

  async patch(
    request: PostsControllerTypes.UpdatePostRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    return reply.send({ message: 'patch posts-api' });
  }

  async destroy(
    request: PostsControllerTypes.DeletePostRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    return reply.send({ message: 'destroy many posts-api' });
  }
}

export default PostsController;
