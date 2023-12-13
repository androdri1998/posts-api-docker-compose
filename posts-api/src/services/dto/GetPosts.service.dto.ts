import { PostDTO, PostsRepository } from '../../repositories/PostsRepository';

export type GetPostsConstructor = {
  postsRepository: PostsRepository;
};

export type GetPostsDTO = {
  limit: number;
  page: number;
};

export type ExecuteResponse = {
  result: PostDTO[];
};

export interface GetPostsService {
  execute(data: GetPostsDTO): Promise<ExecuteResponse>;
}
