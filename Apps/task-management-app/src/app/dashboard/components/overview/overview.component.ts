import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/Task';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent implements OnInit, OnDestroy {
  httpClient = inject(HttpClient);
  taskService = inject(TaskService);
  allTasks: Task[] = [];

  showCreateTaskForm = false;
  showTaskDetails = false;
  currentTaskId: string = '';
  isLoading: boolean = false;
  currentTask: Task | null = null;
  errorMessage: string | null = null;
  editMode: boolean = false;
  selectedTask: Task;
  errorSub: Subscription;

  ngOnInit(): void {
    this.fetchAllTasks();
    this.errorSub = this.taskService.errorSubject.subscribe({
      next: (err: HttpErrorResponse) => {
        this.setErrorMessage(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
    this.editMode = false;
    this.selectedTask = {
      title: '',
      desc: '',
      assignedTo: '',
      createdAt: '',
      priority: '',
      status: '',
    };
  }

  showCurrentTaskDetails(id: string | undefined) {
    this.taskService.getTaskDetails(id).subscribe({
      next: (data: Task) => {
        this.currentTask = data;
      },
    });

    this.showTaskDetails = true;
  }

  CloseTaskDetails() {
    this.showTaskDetails = false;
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  CreateOrUpdateTask(data: Task) {
    if (!this.editMode) {
      this.taskService.CreateTask(data);
    } else {
      this.taskService.UpdateTask(this.currentTaskId, data);
    }
    setTimeout(() => {
      this.FetchAllTaskClicked();
    }, 1000);
  }

  FetchAllTaskClicked() {
    this.fetchAllTasks();
  }

  private fetchAllTasks() {
    this.isLoading = true;
    this.taskService.GetAllTasks().subscribe({
      next: (tasks) => {
        this.allTasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        this.setErrorMessage(error);
        this.isLoading = false;
      },
    });
  }

  private setErrorMessage(err: HttpErrorResponse) {
    if (err.error.error === 'Permission denied') {
      this.errorMessage = 'You do not have permission to perform this action';
    } else {
      this.errorMessage = err.message;
    }

    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }

  DeleteTask(id: string | undefined) {
    this.taskService.DeleteTask(id);

    setTimeout(() => {
      this.FetchAllTaskClicked();
    }, 1000);
  }

  DeleteAllTask() {
    this.taskService.DeleteAllTasks();
    setTimeout(() => {
      this.FetchAllTaskClicked();
    }, 1000);
  }

  onEditTaskClicked(id: string | undefined) {
    this.currentTaskId = id;
    this.editMode = true;
    this.showCreateTaskForm = true;
    this.selectedTask = this.allTasks.find((task) => task.id === id);
  }
}
