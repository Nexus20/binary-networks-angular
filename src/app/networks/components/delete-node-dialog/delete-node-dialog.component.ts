import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";

@Component({
    selector: 'app-delete-node-dialog',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle],
    templateUrl: './delete-node-dialog.component.html',
    styleUrl: './delete-node-dialog.component.scss'
})
export class DeleteNodeDialogComponent {

    constructor(public dialogRef: MatDialogRef<DeleteNodeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onDismiss(): void {
        this.dialogRef.close(false);
    }
}
