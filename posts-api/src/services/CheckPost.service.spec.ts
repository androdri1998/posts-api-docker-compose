import { EntityManager } from 'typeorm';
import PostRepository from '../infra/repositories/PostRepository/PostsTypeORMRepository';
import CheckPostService from './CheckPost.service';
import { PostDTO } from '../repositories/PostsRepository';

jest.mock('../infra/repositories/PostRepository/PostsTypeORMRepository');

describe('CheckPostService suit test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should return true
      when post exists and execute method is called
      given an id parameter`, async () => {
    const date = new Date();
    const mockPostData = {
      id: 1,
      author: 'author name',
      content: 'content text',
    };
    const postsRepository = new PostRepository({} as EntityManager);
    const checkPostService = new CheckPostService({ postsRepository });

    const getByIdSpyOn = jest.spyOn(postsRepository, 'getById');
    getByIdSpyOn.mockImplementation(
      jest.fn(
        async () =>
          ({
            id: 1,
            author: mockPostData.author,
            content: mockPostData.content,
            status: 'Active',
            created_at: date,
            updated_at: date,
          } as PostDTO)
      )
    );

    const result = await checkPostService.execute({ id: mockPostData.id });

    expect(result).toBe(true);
    expect(getByIdSpyOn).toHaveBeenCalledWith(mockPostData.id);
  });

  it(`should return an error
      when there's no post and execute method is called
      given a id parameter`, async () => {
    const mockPostData = {
      id: 1,
      author: 'author name',
      content: 'content text',
    };
    const postsRepository = new PostRepository({} as EntityManager);
    const checkPostService = new CheckPostService({ postsRepository });

    const getByIdSpyOn = jest.spyOn(postsRepository, 'getById');
    getByIdSpyOn.mockImplementation(jest.fn(async () => undefined));

    await expect(
      checkPostService.execute({ id: mockPostData.id })
    ).rejects.toBeInstanceOf(Error);
    expect(getByIdSpyOn).toHaveBeenCalledWith(mockPostData.id);
  });
});
