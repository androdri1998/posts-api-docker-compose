import { PostsRepository } from '../repositories/PostsRepository';
import * as CheckPostTypes from './dto/CheckPost.service.dto';

class CheckPostService implements CheckPostTypes.CheckPostService {
  postsRepository: PostsRepository;

  constructor({ postsRepository }: CheckPostTypes.CheckPostConstructor) {
    this.postsRepository = postsRepository;
  }

  async execute({ id }: CheckPostTypes.CheckPostDTO): Promise<boolean> {
    const post = await this.postsRepository.getById(id);

    if (!post) {
      throw new Error('Post not found');
    }

    return true;
  }
}

export default CheckPostService;
