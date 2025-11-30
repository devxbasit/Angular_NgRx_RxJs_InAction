import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss'],
})
export class TodoHeaderComponent {
  todoService = inject(TodoService);
  todo = '';

  onToggleAll(value: boolean) {
    this.todoService.toggleAllTodo(value);
  }
  onAddTodo() {
    this.todoService.addTodo(this.todo);
    this.todo = '';
  }
}
