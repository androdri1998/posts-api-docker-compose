import { PostsRepository } from '../../repositories/PostsRepository';

export type DeletePostConstructor = {
  postsRepository: PostsRepository;
};

export type DeletePostDTO = {
  id: number;
};

export interface DeletePostService {
  execute(data: DeletePostDTO): Promise<void>;
}
