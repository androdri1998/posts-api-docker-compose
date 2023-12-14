import { PostsRepository } from '../../repositories/PostsRepository';

export type CheckPostConstructor = {
  postsRepository: PostsRepository;
};

export type CheckPostDTO = {
  id: number;
};

export interface CheckPostService {
  execute(data: CheckPostDTO): Promise<boolean>;
}
