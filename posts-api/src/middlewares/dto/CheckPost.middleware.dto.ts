import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify';
import { PostsRepository } from '../../repositories/PostsRepository';
import * as CheckPostTypes from '../../services/dto/CheckPost.service.dto';

export type CheckPostConstructor = {
  postsRepository: PostsRepository;
  checkPostService: CheckPostTypes.CheckPostService;
};

export type CheckPostRequest = FastifyRequest<{
  Params: {
    id: number;
  };
}>;

export interface CheckPostMiddleware {
  execute(
    request: CheckPostRequest,
    reply: FastifyReply,
    done: DoneFuncWithErrOrRes
  ): Promise<FastifyReply | void>;
}
