import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-edge-dialog',
  standalone: true,
    imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle],
  templateUrl: './delete-edge-dialog.component.html',
  styleUrl: './delete-edge-dialog.component.scss'
})
export class DeleteEdgeDialogComponent {

    constructor(public dialogRef: MatDialogRef<DeleteEdgeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onDismiss(): void {
        this.dialogRef.close(false);
    }
}
