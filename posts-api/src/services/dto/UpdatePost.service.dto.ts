import { PostDTO, PostsRepository } from '../../repositories/PostsRepository';

export type UpdatePostConstructor = {
  postsRepository: PostsRepository;
};

export type UpdatePostDTO = {
  id: number;
  content?: string;
  author?: string;
};

export type ExecuteResponse = {
  result: PostDTO | null;
};

export interface UpdatePostsService {
  execute(data: UpdatePostDTO): Promise<ExecuteResponse>;
}
