import { EntityManager } from 'typeorm';
import PostRepository from '../infra/repositories/PostRepository/PostsTypeORMRepository';
import CreatePostService from './CreatePost.service';
import { PostDTO } from '../repositories/PostsRepository';

jest.mock('../infra/repositories/PostRepository/PostsTypeORMRepository');

describe('CreatePostService suit test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should return a post
      when execute method is called
      given an author and content as parameters`, async () => {
    const date = new Date();
    const mockPostData = {
      author: 'author name',
      content: 'content text',
    };
    const mockPost = {
      id: 1,
      author: mockPostData.author,
      content: mockPostData.content,
      status: 'Active',
      created_at: date,
      updated_at: date,
    } as PostDTO;

    const postsRepository = new PostRepository({} as EntityManager);
    const createPostService = new CreatePostService({ postsRepository });

    const createSpyOn = jest.spyOn(postsRepository, 'create');
    createSpyOn.mockImplementation(jest.fn(async () => mockPost));

    const result = await createPostService.execute({
      author: mockPostData.author,
      content: mockPostData.content,
    });

    expect(result).toEqual({
      result: mockPost,
    });
    expect(createSpyOn).toHaveBeenCalledWith({
      author: mockPostData.author,
      content: mockPostData.content,
    });
  });
});
