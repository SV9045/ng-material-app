import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UiService {

  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(msg, action, duration) {
    this.snackbar.open(msg, action, {
      duration: duration
    });
  }
}
