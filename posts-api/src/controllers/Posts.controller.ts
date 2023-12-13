import { FastifyReply } from 'fastify';
import * as PostsControllerTypes from './dto/Posts.controller.dto';
import { PostsRepository } from '../repositories/PostsRepository';
import * as CreatePostTypes from '../services/dto/CreatePost.service.dto';
import * as DeletePostTypes from '../services/dto/DeletePost.service.dto';
import * as GetPostTypes from '../services/dto/GetPost.service.dto';
import * as GetPostsTypes from '../services/dto/GetPosts.service.dto';
import * as UdpatePostTypes from '../services/dto/UpdatePost.service.dto';

class PostsController implements PostsController {
  postsRepository: PostsRepository;
  createPostService: CreatePostTypes.CreatePostService;
  deletePostService: DeletePostTypes.DeletePostService;
  getPostService: GetPostTypes.GetPostService;
  getPostsService: GetPostsTypes.GetPostsService;
  updatePostService: UdpatePostTypes.UpdatePostsService;

  constructor({
    postsRepository,
    createPostService,
    deletePostService,
    getPostService,
    getPostsService,
    updatePostService,
  }: PostsControllerTypes.PostsControllerConstructor) {
    this.postsRepository = postsRepository;
    this.createPostService = createPostService;
    this.deletePostService = deletePostService;
    this.getPostService = getPostService;
    this.getPostsService = getPostsService;
    this.updatePostService = updatePostService;

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
    const { content, author } = request.body;

    const result = await this.createPostService.execute({ content, author });

    return reply.status(201).send(result);
  }

  async index(
    request: PostsControllerTypes.GetPostsRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { limit, page } = request.query;

    const result = await this.getPostsService.execute({
      limit: parseInt(String(limit)),
      page: parseInt(String(page)),
    });

    return reply.send(result);
  }

  async get(
    request: PostsControllerTypes.GetPostRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { id } = request.params;

    const result = await this.getPostService.execute({ id });

    return reply.send(result);
  }

  async patch(
    request: PostsControllerTypes.UpdatePostRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { id } = request.params;
    const { content, author } = request.body;

    const result = await this.updatePostService.execute({
      id,
      content,
      author,
    });

    return reply.send(result);
  }

  async destroy(
    request: PostsControllerTypes.DeletePostRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { id } = request.params;

    await this.deletePostService.execute({ id });

    return reply.status(204).send();
  }
}

export default PostsController;
