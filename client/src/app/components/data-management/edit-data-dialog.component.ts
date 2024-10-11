import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'edit-data-dialog',
  templateUrl: './edit-data-dialog.component.html',
})
export class EditDataDialog {
  constructor(
    public dialogRef: MatDialogRef<EditDataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
