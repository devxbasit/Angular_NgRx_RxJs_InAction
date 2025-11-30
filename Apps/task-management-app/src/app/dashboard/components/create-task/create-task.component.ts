import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  NgZoneOptions,
  OnInit,
  Output,
  ViewChild,
  output,
  ɵgetEnsureDirtyViewsAreAlwaysReachable,
} from '@angular/core';
import { Task } from '../../../models/Task';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent implements AfterViewInit {
  @Input() isEditMode = false;
  @Input() selectedTask: Task;

  @Output() CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() EmitTaskData: EventEmitter<Task> = new EventEmitter<Task>();

  @ViewChild('taskForm') taskForm: NgForm;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.taskForm.form.patchValue(this.selectedTask);
    }, 0);
  }

  onCloseForm() {
    console.log('emit close form');
    this.CloseForm.emit(false);
  }

  OnFormSubmit(form: NgForm) {
    this.EmitTaskData.emit(form.value);
    this.CloseForm.emit(false);
  }
}
