import { EntityManager } from 'typeorm';
import PostRepository from '../infra/repositories/PostRepository/PostsTypeORMRepository';
import DeletePostService from './DeletePost.service';

jest.mock('../infra/repositories/PostRepository/PostsTypeORMRepository');

describe('DeletePostService suit test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should delete a post
      when execute method is called
      given an id as parameter`, async () => {
    const mockPostData = {
      id: 1,
      author: 'author name',
      content: 'content text',
    };

    const postsRepository = new PostRepository({} as EntityManager);
    const deletePostService = new DeletePostService({ postsRepository });

    const deleteByIdSpyOn = jest.spyOn(postsRepository, 'deleteById');
    deleteByIdSpyOn.mockImplementation(jest.fn(async () => true));

    const result = await deletePostService.execute({ id: mockPostData.id });

    expect(result).toBe(undefined);
    expect(deleteByIdSpyOn).toHaveBeenCalledWith(mockPostData.id);
  });
});
