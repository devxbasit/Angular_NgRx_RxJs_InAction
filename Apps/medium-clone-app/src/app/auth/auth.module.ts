import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { NoAuthGuard } from './guards/no-auth-guard.service';

@NgModule({
  declarations: [AuthComponent],
  imports: [SharedModule, AuthRoutingModule],
  exports: [AuthRoutingModule],
  providers: [NoAuthGuard],
})
export class AuthModule {}
