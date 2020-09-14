import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../component/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  constructor(private dialog: MatDialog) { }

  open() : MatDialogRef<SpinnerComponent>{
    return this.dialog.open(SpinnerComponent, {
      // panelClass: 'transparent',
      panelClass: 'my-class',
      backdropClass:'green-backdrop',
      disableClose: true
    });
  }

  close(ref: MatDialogRef<SpinnerComponent>) {
    ref.close();
  }

}