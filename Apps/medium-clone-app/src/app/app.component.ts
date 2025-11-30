import { Component, OnInit, inject } from '@angular/core';
import { UserService } from './core/services/user.service';
import { __importDefault } from 'tslib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'medium-clone';
  userService = inject(UserService);

  ngOnInit(): void {
    this.userService.populate();
  }
}
