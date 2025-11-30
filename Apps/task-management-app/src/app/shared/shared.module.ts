import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

@NgModule({
  declarations: [LoaderComponent, SnackbarComponent],
  exports: [LoaderComponent, SnackbarComponent, FormsModule],
  imports: [FormsModule],
})
export class SharedModule {}
