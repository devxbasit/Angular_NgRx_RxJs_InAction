import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar"


@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  snackBar: MatSnackBar = inject(MatSnackBar);

  showSuccess(message: string) {
    this.snackBar.open(message, 'close',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: 'success-snackbar'
      });
  }

  showError(message: string) {
    this.snackBar.open(message, 'close',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: 'error-snackbar'
      });
  }

}
