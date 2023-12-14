import { EntityManager } from 'typeorm';
import PostRepository from '../infra/repositories/PostRepository/PostsTypeORMRepository';
import GetPostsService from './GetPosts.service';
import { PostDTO } from '../repositories/PostsRepository';

jest.mock('../infra/repositories/PostRepository/PostsTypeORMRepository');

describe('GetPostsService suit test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should return result with a list of posts
      when there's posts and execute method is called
      given a page and limit as parameter`, async () => {
    const date = new Date();
    const mockPostData = {
      id: 1,
      author: 'author name',
      content: 'content text',
    };
    const mockPost = {
      id: mockPostData.id,
      author: mockPostData.author,
      content: mockPostData.content,
      status: 'Active',
      created_at: date,
      updated_at: date,
    } as PostDTO;
    const mockPosts = [mockPost, mockPost, mockPost];

    const postsRepository = new PostRepository({} as EntityManager);
    const getPostsService = new GetPostsService({ postsRepository });

    const indexSpyOn = jest.spyOn(postsRepository, 'index');
    indexSpyOn.mockImplementation(jest.fn(async () => mockPosts));

    const limit = 10;
    const page = 1;
    const offset = limit * (page - 1);
    const result = await getPostsService.execute({ limit: 10, page: 1 });

    expect(result).toEqual({
      result: mockPosts,
    });
    expect(indexSpyOn).toHaveBeenCalledWith(limit, offset);
  });

  it(`should return result with an empty list
      when there's no posts and execute method is called
      given an limit and page as parameter`, async () => {
    const postsRepository = new PostRepository({} as EntityManager);
    const getPostsService = new GetPostsService({ postsRepository });

    const indexSpyOn = jest.spyOn(postsRepository, 'index');
    indexSpyOn.mockImplementation(jest.fn(async () => []));

    const limit = 10;
    const page = 1;
    const offset = limit * (page - 1);
    const result = await getPostsService.execute({ limit, page });

    expect(result).toEqual({
      result: [],
    });
    expect(indexSpyOn).toHaveBeenCalledWith(limit, offset);
  });
});
