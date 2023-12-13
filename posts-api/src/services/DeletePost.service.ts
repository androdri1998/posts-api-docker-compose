import { PostsRepository } from '../repositories/PostsRepository';
import * as DeletePostTypes from './dto/DeletePost.service.dto';

class DeletePostService implements DeletePostTypes.DeletePostService {
  postsRepository: PostsRepository;

  constructor({ postsRepository }: DeletePostTypes.DeletePostConstructor) {
    this.postsRepository = postsRepository;
  }

  async execute({ id }: DeletePostTypes.DeletePostDTO): Promise<void> {
    await this.postsRepository.deleteById(id);
  }
}

export default DeletePostService;
