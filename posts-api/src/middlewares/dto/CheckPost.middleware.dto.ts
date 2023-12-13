import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify';
import { PostsRepository } from '../../repositories/PostsRepository';

export type CheckPostConstructor = {
  postsRepository: PostsRepository;
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
