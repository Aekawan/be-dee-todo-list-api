import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs-extra';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
}

@Injectable()
export class TodosService {
  private readonly filePath = join(__dirname, '../../db/todos.json');
  private idCounter = 1;

  constructor() {
    this.init();
  }

  private async init() {
    const todos = await this.readTodos();
    this.idCounter = todos.length
      ? Math.max(...todos.map((todo) => todo.id)) + 1
      : 1;
  }

  private async readTodos(): Promise<Todo[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as Todo[];
    } catch (error) {
      return [];
    }
  }

  private async writeTodos(todos: Todo[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(todos, null, 2));
  }

  async findAll(): Promise<Todo[]> {
    return this.readTodos();
  }

  async findOne(id: number): Promise<Todo> {
    const todos = await this.readTodos();
    return todos.find((todo) => todo.id === id);
  }

  async create(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const todos = await this.readTodos();
    const newTodo = { ...todo, id: this.idCounter++ };
    todos.push(newTodo);
    await this.writeTodos(todos);
    return newTodo;
  }

  async update(id: number, updateTodoDto: Partial<Todo>): Promise<Todo> {
    const todos = await this.readTodos();
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex > -1) {
      todos[todoIndex] = { ...todos[todoIndex], ...updateTodoDto };
      await this.writeTodos(todos);
      return todos[todoIndex];
    }
    return null;
  }

  async remove(id: number): Promise<boolean> {
    const todos = await this.readTodos();
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex > -1) {
      todos.splice(todoIndex, 1);
      await this.writeTodos(todos);
      return true;
    }
    return false;
  }
}
