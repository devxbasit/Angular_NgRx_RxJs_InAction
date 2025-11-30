import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  todoFilter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  addTodo(text: string) {
    const newTodo: TodoInterface = {
      id: Math.random().toString(16),
      isCompleted: false,
      text: text,
    };

    const updatedTodoList = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodoList);
    console.log('add', this.todos$.getValue());
  }

  toggleAllTodo(isCompleted: boolean) {
    const updatedTodo = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted: isCompleted,
      };
    });

    this.todos$.next(updatedTodo);
    console.log('add', this.todos$.getValue());
  }

  changeFilter(filter: FilterEnum) {
    this.todoFilter$.next(filter);
  }

  updateTodo(id: string, text: string) {
    const updatedTodo = this.todos$.getValue().map((todo) => {
      if (todo.id !== id) {
        return todo;
      }

      return {
        ...todo,
        text: text,
      };
    });

    this.todos$.next(updatedTodo);
    console.log('add', this.todos$.getValue());
  }

  removeTodo(id: string) {
    const updatedTodo = this.todos$.getValue().filter((todo) => todo.id !== id);
    this.todos$.next(updatedTodo);
    console.log('add', this.todos$.getValue());
  }

  toggleTodo(id: string) {
    const updatedTodo = this.todos$.getValue().map((todo) => {
      if (todo.id !== id) {
        return todo;
      }

      return {
        ...todo,
        isCompleted: !todo.isCompleted,
      };
    });

    this.todos$.next(updatedTodo);
    console.log('add', this.todos$.getValue());
  }
}
