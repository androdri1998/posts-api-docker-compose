import { PostDTO, PostsRepository } from '../../repositories/PostsRepository';

export type GetPostConstructor = {
  postsRepository: PostsRepository;
};

export type GetPostDTO = {
  id: number;
};

export type ExecuteResponse = {
  result: PostDTO | null;
};

export interface GetPostService {
  execute(data: GetPostDTO): Promise<ExecuteResponse>;
}
