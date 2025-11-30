import { NgModule } from '@angular/core';
import { OverviewComponent } from './components/overview/overview.component';
import { StatsComponent } from './components/stats/stats.component';
import { authGuard } from '../guards/auth.guard';
import { Route, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'stats', component: StatsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DashboardRouteModule {}
