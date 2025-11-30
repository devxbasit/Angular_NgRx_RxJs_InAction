import { Component, Input } from '@angular/core';
import { Errors } from 'src/app/core/models/errors.model';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.scss'],
})
export class ListErrorsComponent {
  private _formattedErrors: Array<string> = [];

  @Input()
  set errors(errors: Errors) {
    this._formattedErrors = Object.entries(errors.errors || {}).map(([key, value]) => {
      return `${key} ${value}`;
    });
  }

  get errorsList() {
    return this._formattedErrors;
  }

  trackByFn(index: number, item: any) {
    return index;
  }
}
