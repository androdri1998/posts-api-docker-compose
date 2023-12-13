import { FastifyReply, DoneFuncWithErrOrRes } from 'fastify';
import * as CheckPostMiddlewareTypes from './dto/CheckPost.middleware.dto';
import { PostsRepository } from '../repositories/PostsRepository';

class CheckPostMiddleware
  implements CheckPostMiddlewareTypes.CheckPostMiddleware
{
  postsRepository: PostsRepository;

  constructor({
    postsRepository,
  }: CheckPostMiddlewareTypes.CheckPostConstructor) {
    this.postsRepository = postsRepository;

    this.execute = this.execute.bind(this);
  }

  async execute(
    request: CheckPostMiddlewareTypes.CheckPostRequest,
    reply: FastifyReply,
    done: DoneFuncWithErrOrRes
  ): Promise<FastifyReply | void> {
    const { id } = request.params;
    const post = await this.postsRepository.getById(id);

    if (!post) {
      reply.status(404).send({
        error: 'Not found',
        description: 'post not found',
      });
    }

    done();
  }
}

export default CheckPostMiddleware;
