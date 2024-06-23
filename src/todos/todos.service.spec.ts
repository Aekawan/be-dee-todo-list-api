import { Test, TestingModule } from '@nestjs/testing';
import { TodosService, Todo } from './todos.service';
import * as fs from 'fs-extra';
import { join } from 'path';

jest.mock('fs-extra');

describe('TodosService', () => {
  let service: TodosService;
  const filePath = join(__dirname, '../../db/todos.json');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const todos: Todo[] = [{ id: 1, title: 'Test Todo', isCompleted: false }];
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(todos));

      expect(await service.findAll()).toEqual(todos);
    });
  });

  describe('findOne', () => {
    it('should return a single todo', async () => {
      const todos: Todo[] = [{ id: 1, title: 'Test Todo', isCompleted: false }];
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(todos));

      expect(await service.findOne(1)).toEqual(todos[0]);
    });

    it('should return undefined if todo not found', async () => {
      const todos: Todo[] = [{ id: 1, title: 'Test Todo', isCompleted: false }];
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(todos));

      expect(await service.findOne(2)).toBeUndefined();
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const todos: Todo[] = [];
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(todos));
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      const newTodo = { title: 'New Todo', isCompleted: false };
      const createdTodo = await service.create(newTodo);

      expect(createdTodo).toEqual({ ...newTodo, id: 1 });
      expect(fs.writeFile).toHaveBeenCalledWith(
        filePath,
        JSON.stringify([{ ...newTodo, id: 1 }], null, 2),
      );
    });
  });

  describe('update', () => {
    it('should update an existing todo', async () => {
      const todos: Todo[] = [{ id: 1, title: 'Test Todo', isCompleted: false }];
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(todos));
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      const updatedTodo = { title: 'Updated Todo', isCompleted: true };
      const result = await service.update(1, updatedTodo);

      expect(result).toEqual({ id: 1, ...updatedTodo });
      expect(fs.writeFile).toHaveBeenCalledWith(
        filePath,
        JSON.stringify([{ id: 1, ...updatedTodo }], null, 2),
      );
    });

    it('should return null if todo not found', async () => {
      const todos: Todo[] = [{ id: 1, title: 'Test Todo', isCompleted: false }];
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(todos));

      expect(await service.update(2, { title: 'Updated Todo' })).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove an existing todo', async () => {
      const todos: Todo[] = [{ id: 1, title: 'Test Todo', isCompleted: false }];
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(todos));
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      const result = await service.remove(1);

      expect(result).toBe(true);
      expect(fs.writeFile).toHaveBeenCalledWith(
        filePath,
        JSON.stringify([], null, 2),
      );
    });

    it('should return false if todo not found', async () => {
      const todos: Todo[] = [{ id: 1, title: 'Test Todo', isCompleted: false }];
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(todos));

      expect(await service.remove(2)).toBe(false);
    });
  });
});
