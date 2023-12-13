import { PostData } from "../services/dto/CreatePost.service.dto";

export enum PostStatus {
  ACTIVE = "Active",
  DELETED = "Deleted",
}

export interface PostDTO {
  id: number;
  content: string;
  author: string;
  status: PostStatus;
  created_at: Date;
  updated_at: Date;
}

export interface PostsRepository {
  getById: (id: number) => Promise<PostDTO | undefined>;
  index: (name: string, limit: number, offset: number) => Promise<PostDTO[]>;
  updateById: (data: PostDTO) => Promise<PostDTO>;
  deleteById: (id: number) => Promise<boolean>;
  create: (data: PostData) => Promise<PostDTO>;
}
