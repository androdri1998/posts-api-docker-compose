import { PostDTO, PostsRepository } from '../../repositories/PostsRepository';

export interface PostData {
  content: string;
  author: string;
}

export interface Post {
  content: string;
  author: string;
}

export type CreatePostConstructor = {
  postsRepository: PostsRepository;
};

export type CreatePostDTO = {
  author: string;
  content: string;
};

export type ExecuteResponse = {
  result: PostDTO;
};

export interface CreatePostService {
  execute(data: CreatePostDTO): Promise<ExecuteResponse>;
}
