import { PostsRepository } from '../repositories/PostsRepository';
import * as GetPostsTypes from './dto/GetPosts.service.dto';

class GetPostsService implements GetPostsTypes.GetPostsService {
  postsRepository: PostsRepository;

  constructor({ postsRepository }: GetPostsTypes.GetPostsConstructor) {
    this.postsRepository = postsRepository;
  }

  async execute({
    limit = 10,
    page = 1,
  }: GetPostsTypes.GetPostsDTO): Promise<GetPostsTypes.ExecuteResponse> {
    const offset = limit * (page - 1);

    const posts = await this.postsRepository.index(limit, offset);

    return { result: posts };
  }
}

export default GetPostsService;
