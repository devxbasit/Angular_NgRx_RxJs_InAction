import { Component, Input, OnInit, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { NgControl } from '@angular/forms';
import { TodoInterface } from '../../types/todo.interface';
import { FilterEnum } from '../../types/filter.enum';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss'],
})
export class TodoMainComponent implements OnInit {
  todos: TodoInterface[] = [];

  todoService = inject(TodoService);

  todos$: Observable<TodoInterface[]> = this.todoService.todos$;
  todoFilter$: Observable<FilterEnum> = this.todoService.todoFilter$;

  ngOnInit(): void {
    combineLatest([this.todos$, this.todoFilter$])
      .pipe(
        map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
          if (filter === FilterEnum.active || filter === FilterEnum.completed) {
            const filteredTodos = todos.filter((todo) => {
              if (filter === FilterEnum.active) {
                return todo.isCompleted === false;
              }

              if (filter === FilterEnum.completed) {
                return todo.isCompleted === true;
              }

              return false;
            });

            return filteredTodos;
          }

          return todos;
        })
      )
      .subscribe({
        next: (data) => {
          this.todos = data;
        },
      });
  }
}
