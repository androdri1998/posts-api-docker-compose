import { EntityManager } from "typeorm";
import {
  PostDTO,
  PostStatus,
  PostsRepository,
} from "../../../repositories/PostsRepository";
import { formatDatetime } from "../../../helpers/dateHelper";
import { PostData } from "../../../services/dto/CreatePostService.dto";

class PostsTypeORMRepository implements PostsRepository {
  database: EntityManager;

  constructor(database: EntityManager) {
    this.database = database;
  }

  async getById(id: number): Promise<PostDTO | undefined> {
    const posts = await this.database.query(`SELECT * FROM post WHERE id=?;`, [
      id,
    ]);

    return posts[0];
  }

  async index(
    name: string,
    limit: number,
    offset: number
  ): Promise<PostDTO | undefined> {
    const posts = await this.database.query(
      `SELECT * FROM post WHERE name=? LIMIT ? OFFSET ?;`,
      [name, limit, offset]
    );

    return posts;
  }

  async updateById(post: PostDTO) {
    const currentDate = new Date();
    const now = formatDatetime(currentDate);

    await this.database.query(
      `UPDATE post SET
    content=?, 
    author=?, 
    updated_at=?
    WHERE id=?;`,
      [post.content, post.author, now, post.id]
    );

    post.updated_at = currentDate;

    return post;
  }

  async deleteById(id: number): Promise<boolean> {
    await this.database.query(
      `UPDATE post SET 
    status=?,  
    updated_at=?
    WHERE id=?;`,
      [PostStatus.DELETED, formatDatetime(new Date()), id]
    );

    return true;
  }

  async create(post: PostData): Promise<PostDTO> {
    const currentDate = new Date();
    const now = formatDatetime(currentDate);
    const row = await this.database.query(
      `INSERT INTO post(content, author, status, created_at, updated_at) 
      VALUES(
        ?, 
        ?, 
        ?,
        ?,
        ?
      );
    `,
      [post.content, post.author, PostStatus.ACTIVE, now, now]
    );

    let newPost: PostDTO = post as PostDTO;
    newPost.id = row.insertId;
    newPost.status = PostStatus.ACTIVE;
    newPost.created_at = currentDate;
    newPost.updated_at = currentDate;

    return newPost;
  }
}

export default PostsTypeORMRepository;
