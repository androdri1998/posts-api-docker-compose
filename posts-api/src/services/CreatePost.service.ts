import { PostsRepository } from '../repositories/PostsRepository';
import * as CreatePostTypes from './dto/CreatePost.service.dto';

class CreatePostService implements CreatePostTypes.CreatePostService {
  postsRepository: PostsRepository;

  constructor({ postsRepository }: CreatePostTypes.CreatePostConstructor) {
    this.postsRepository = postsRepository;
  }

  async execute(
    data: CreatePostTypes.CreatePostDTO
  ): Promise<CreatePostTypes.ExecuteResponse> {
    const post = await this.postsRepository.create(data);

    return { result: post };
  }
}

export default CreatePostService;
