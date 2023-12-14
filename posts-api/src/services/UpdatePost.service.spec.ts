import { EntityManager } from 'typeorm';
import PostRepository from '../infra/repositories/PostRepository/PostsTypeORMRepository';
import UpdatePostService from './UpdatePost.service';
import { PostDTO } from '../repositories/PostsRepository';

jest.mock('../infra/repositories/PostRepository/PostsTypeORMRepository');

describe('UpdatePostService suit test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should return an updated post
      when execute method is called
      given an id, author and content as parameters`, async () => {
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
    const newPost = mockPost;
    newPost.author = 'new author';
    newPost.content = 'new content';

    const postsRepository = new PostRepository({} as EntityManager);
    const updatePostService = new UpdatePostService({ postsRepository });

    const getByIdSpyOn = jest.spyOn(postsRepository, 'getById');
    getByIdSpyOn.mockImplementation(jest.fn(async () => mockPost));
    const updateByIdSpyOn = jest.spyOn(postsRepository, 'updateById');
    updateByIdSpyOn.mockImplementation(jest.fn(async (post) => post));

    const result = await updatePostService.execute({
      id: mockPostData.id,
      author: newPost.author,
      content: newPost.content,
    });

    expect(result).toEqual({
      result: newPost,
    });
    expect(getByIdSpyOn).toHaveBeenCalledWith(mockPostData.id);
    expect(updateByIdSpyOn).toHaveBeenCalledWith(newPost);
  });

  it(`should return a non updated post
      when execute method is called
      given only an id as parameter`, async () => {
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
    const updatePostService = new UpdatePostService({ postsRepository });

    const getByIdSpyOn = jest.spyOn(postsRepository, 'getById');
    getByIdSpyOn.mockImplementation(jest.fn(async () => mockPost));
    const updateByIdSpyOn = jest.spyOn(postsRepository, 'updateById');
    updateByIdSpyOn.mockImplementation(jest.fn(async (post) => post));

    const result = await updatePostService.execute({
      id: mockPostData.id,
    });

    expect(result).toEqual({
      result: mockPost,
    });
    expect(getByIdSpyOn).toHaveBeenCalledWith(mockPostData.id);
    expect(updateByIdSpyOn).toHaveBeenCalledWith(mockPost);
  });

  it(`should return result as null
      when there's no post and execute method is called
      given an id, author and content as parameter`, async () => {
    const mockPostData = {
      id: 1,
      author: 'author name',
      content: 'content text',
    };
    const postsRepository = new PostRepository({} as EntityManager);
    const updatePostService = new UpdatePostService({ postsRepository });

    const getByIdSpyOn = jest.spyOn(postsRepository, 'getById');
    getByIdSpyOn.mockImplementation(jest.fn(async () => undefined));
    const updateByIdSpyOn = jest.spyOn(postsRepository, 'updateById');
    updateByIdSpyOn.mockImplementation(jest.fn(async (post) => post));

    const result = await updatePostService.execute({
      id: mockPostData.id,
      author: 'new author',
      content: 'new content',
    });

    expect(result).toEqual({
      result: null,
    });
    expect(getByIdSpyOn).toHaveBeenCalledWith(mockPostData.id);
    expect(updateByIdSpyOn).not.toHaveBeenCalled();
  });
});
