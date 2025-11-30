import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from '../guards/login.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoginGuard] },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, CommonModule, RouterModule.forChild(routes)],
})
export class AuthModule {}
