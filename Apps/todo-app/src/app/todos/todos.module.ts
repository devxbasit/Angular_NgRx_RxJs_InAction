import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoHeaderComponent } from './components/todo-header/todo-header.component';
import { TodoFooterComponent } from './components/todo-footer/todo-footer.component';
import { TodoMainComponent } from './components/todo-main/todo-main.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodosRoutingModule } from './todos-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TodoHeaderComponent,
    TodoFooterComponent,
    TodoMainComponent,
    TodoComponent,
    TodoListComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [TodosRoutingModule],
})
export class TodosModule {}
