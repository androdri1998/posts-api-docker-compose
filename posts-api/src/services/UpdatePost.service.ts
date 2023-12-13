import { PostsRepository } from '../repositories/PostsRepository';
import * as UpdatePostTypes from './dto/UpdatePost.service.dto';

class UpdatePostService implements UpdatePostTypes.UpdatePostsService {
  postsRepository: PostsRepository;

  constructor({ postsRepository }: UpdatePostTypes.UpdatePostConstructor) {
    this.postsRepository = postsRepository;
  }

  async execute({
    id,
    author,
    content,
  }: UpdatePostTypes.UpdatePostDTO): Promise<UpdatePostTypes.ExecuteResponse> {
    const post = await this.postsRepository.getById(id);
    if (!post) {
      return { result: null };
    }

    post.author = author || post.author;
    post.content = content || post.content;

    const newPost = await this.postsRepository.updateById(post);

    return { result: newPost };
  }
}

export default UpdatePostService;
