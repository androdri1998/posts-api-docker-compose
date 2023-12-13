import { FastifyReply, FastifyRequest } from 'fastify';
import { PostData } from '../../services/dto/CreatePost.service.dto';
import { PostsRepository } from '../../repositories/PostsRepository';
import * as CreatePostTypes from '../../services/dto/CreatePost.service.dto';
import * as DeletePostTypes from '../../services/dto/DeletePost.service.dto';
import * as GetPostTypes from '../../services/dto/GetPost.service.dto';
import * as GetPostsTypes from '../../services/dto/GetPosts.service.dto';
import * as UdpatePostTypes from '../../services/dto/UpdatePost.service.dto';

export type PostsControllerConstructor = {
  postsRepository: PostsRepository;
  createPostService: CreatePostTypes.CreatePostService;
  deletePostService: DeletePostTypes.DeletePostService;
  getPostService: GetPostTypes.GetPostService;
  getPostsService: GetPostsTypes.GetPostsService;
  updatePostService: UdpatePostTypes.UpdatePostsService;
};

export type CreatePostRequest = FastifyRequest<{
  Body: PostData;
}>;

export type GetPostsRequest = FastifyRequest<{
  Querystring: {
    page: number;
    limit: number;
  };
}>;

export type GetPostRequest = FastifyRequest<{
  Params: {
    id: number;
  };
}>;

export type UpdatePostRequest = FastifyRequest<{
  Params: {
    id: number;
  };
  Body: {
    author?: string;
    content?: string;
  };
}>;

export type DeletePostRequest = FastifyRequest<{
  Params: {
    id: number;
  };
}>;

export interface PostsController {
  create(
    request: CreatePostRequest,
    reply: FastifyReply
  ): Promise<FastifyReply>;
  index(request: GetPostsRequest, reply: FastifyReply): Promise<FastifyReply>;
  get(request: GetPostRequest, reply: FastifyReply): Promise<FastifyReply>;
  patch(request: UpdatePostRequest, reply: FastifyReply): Promise<FastifyReply>;
  destroy(
    request: DeletePostRequest,
    reply: FastifyReply
  ): Promise<FastifyReply>;
}
