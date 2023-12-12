import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PostStatus } from "../../../../repositories/PostsRepository";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  content: string;

  @Column({ nullable: false })
  author: string;

  @Column({ type: "enum", enum: PostStatus, nullable: false })
  status: PostStatus;

  @Column({ type: "datetime", nullable: false })
  created_at: Date;

  @Column({ type: "datetime", nullable: false })
  updated_at: Date;
}
