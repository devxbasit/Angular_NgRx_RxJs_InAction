import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input({ required: true }) Todo: TodoInterface = {
    id: '',
    text: '',
    isCompleted: false,
  };

  isEditMode = false;
  todoService = inject(TodoService);

  deleteTodo(id: string | undefined) {
    if (id) {
      this.todoService.removeTodo(id);
    }
  }

  enableEditMode() {
    this.isEditMode = true;
  }

  updateTodo(value: string) {
    if (this.Todo.id) {
      this.isEditMode = false;
      this.todoService.updateTodo(this.Todo.id, value);
    }
  }

  toggleTodo(id: string | undefined) {
    if (id) {
      this.todoService.toggleTodo(id);
    }
  }
}
