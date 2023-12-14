import { FastifyReply, DoneFuncWithErrOrRes } from 'fastify';
import * as CheckPostMiddlewareTypes from './dto/CheckPost.middleware.dto';
import { PostsRepository } from '../repositories/PostsRepository';
import * as CheckPostTypes from '../services/dto/CheckPost.service.dto';

class CheckPostMiddleware
  implements CheckPostMiddlewareTypes.CheckPostMiddleware
{
  postsRepository: PostsRepository;
  checkPostService: CheckPostTypes.CheckPostService;

  constructor({
    postsRepository,
    checkPostService,
  }: CheckPostMiddlewareTypes.CheckPostConstructor) {
    this.postsRepository = postsRepository;
    this.checkPostService = checkPostService;

    this.execute = this.execute.bind(this);
  }

  async execute(
    request: CheckPostMiddlewareTypes.CheckPostRequest,
    reply: FastifyReply,
    done: DoneFuncWithErrOrRes
  ): Promise<FastifyReply | void> {
    const { id } = request.params;

    try {
      await this.checkPostService.execute({ id });
      done();
    } catch (err: any) {
      reply.status(404).send({
        error: 'Not found',
        description: err.message,
      });
    }
  }
}

export default CheckPostMiddleware;
