import { EntityManager } from 'typeorm';
import PostRepository from '../infra/repositories/PostRepository/PostsTypeORMRepository';
import GetPostService from './GetPost.service';
import { PostDTO } from '../repositories/PostsRepository';

jest.mock('../infra/repositories/PostRepository/PostsTypeORMRepository');

describe('GetPostService suit test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should return result with a post value
      when there's a post and execute method is called
      given an id as parameter`, async () => {
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

    const postsRepository = new PostRepository({} as EntityManager);
    const getPostService = new GetPostService({ postsRepository });

    const getByIdSpyOn = jest.spyOn(postsRepository, 'getById');
    getByIdSpyOn.mockImplementation(jest.fn(async () => mockPost));

    const result = await getPostService.execute({ id: mockPostData.id });

    expect(result).toEqual({
      result: mockPost,
    });
    expect(getByIdSpyOn).toHaveBeenCalledWith(mockPostData.id);
  });

  it(`should return result with null value
      when there's no post and execute method is called
      given an id as parameter`, async () => {
    const mockPostData = {
      id: 1,
      author: 'author name',
      content: 'content text',
    };

    const postsRepository = new PostRepository({} as EntityManager);
    const getPostService = new GetPostService({ postsRepository });

    const getByIdSpyOn = jest.spyOn(postsRepository, 'getById');
    getByIdSpyOn.mockImplementation(jest.fn(async () => undefined));

    const result = await getPostService.execute({ id: mockPostData.id });

    expect(result).toEqual({
      result: null,
    });
    expect(getByIdSpyOn).toHaveBeenCalledWith(mockPostData.id);
  });
});
