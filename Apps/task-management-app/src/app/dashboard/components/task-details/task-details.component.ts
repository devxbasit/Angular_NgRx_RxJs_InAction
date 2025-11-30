import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../models/Task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent {
  @Output() CloseDetailView: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() currentTask: Task | null = null;

  onCloseTaskDetail() {
    this.CloseDetailView.emit(false);
  }
}
