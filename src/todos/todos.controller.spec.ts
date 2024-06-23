import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService, Todo } from './todos.service';

describe('TodosController', () => {
  let controller: TodosController;

  const mockTodosService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: mockTodosService,
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const todos: Todo[] = [{ id: 1, title: 'Test Todo', isCompleted: false }];
      mockTodosService.findAll.mockResolvedValue(todos);

      expect(await controller.findAll()).toBe(todos);
    });
  });

  describe('findOne', () => {
    it('should return a single todo', async () => {
      const todo: Todo = { id: 1, title: 'Test Todo', isCompleted: false };
      mockTodosService.findOne.mockResolvedValue(todo);

      expect(await controller.findOne('1')).toBe(todo);
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const todo: Todo = { id: 1, title: 'New Todo', isCompleted: false };
      mockTodosService.create.mockResolvedValue(todo);

      expect(
        await controller.create({ title: 'New Todo', isCompleted: false }),
      ).toBe(todo);
    });
  });

  describe('update', () => {
    it('should update an existing todo', async () => {
      const todo: Todo = { id: 1, title: 'Updated Todo', isCompleted: true };
      mockTodosService.update.mockResolvedValue(todo);

      expect(
        await controller.update('1', {
          title: 'Updated Todo',
          isCompleted: true,
        }),
      ).toBe(todo);
    });
  });

  describe('remove', () => {
    it('should remove an existing todo', async () => {
      mockTodosService.remove.mockResolvedValue(true);

      expect(await controller.remove('1')).toBe(true);
    });
  });
});
