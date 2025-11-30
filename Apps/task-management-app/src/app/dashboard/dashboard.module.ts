import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { OverviewComponent } from './components/overview/overview.component';
import { StatsComponent } from './components/stats/stats.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardRouteModule } from './dashboard-route.module';

@NgModule({
  declarations: [DashboardComponent, CreateTaskComponent, TaskDetailsComponent, OverviewComponent, StatsComponent],
  exports: [SharedModule, DashboardRouteModule],
  imports: [SharedModule, RouterModule, CommonModule],
})
export class DashboardModule {}
