import { PostsRepository } from '../repositories/PostsRepository';
import * as GetPostTypes from './dto/GetPost.service.dto';

class GetPostService implements GetPostTypes.GetPostService {
  postsRepository: PostsRepository;

  constructor({ postsRepository }: GetPostTypes.GetPostConstructor) {
    this.postsRepository = postsRepository;
  }

  async execute({
    id,
  }: GetPostTypes.GetPostDTO): Promise<GetPostTypes.ExecuteResponse> {
    const post = await this.postsRepository.getById(id);

    return { result: post || null };
  }
}

export default GetPostService;
