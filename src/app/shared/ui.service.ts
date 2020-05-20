import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root',
})
export class UiService {

  loadingStateChanged = new Subject<boolean>();
  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(msg, action, duration) {
    this.snackbar.open(msg, action, {
      duration: duration
    });
  }
}
