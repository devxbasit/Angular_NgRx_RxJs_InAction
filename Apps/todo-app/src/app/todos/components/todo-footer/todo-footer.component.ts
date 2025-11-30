import { Component, OnInit, inject } from '@angular/core';
import { FilterEnum } from '../../types/filter.enum';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss'],
})
export class TodoFooterComponent implements OnInit {
  FilterEnum = FilterEnum;
  currentFilter = FilterEnum.all;
  todoService = inject(TodoService);

  ngOnInit(): void {
    this.todoService.todoFilter$.subscribe((filter) => {
      this.currentFilter = filter;
    });
  }

  changeFilter(filter: FilterEnum) {
    this.todoService.changeFilter(filter);
  }
}
