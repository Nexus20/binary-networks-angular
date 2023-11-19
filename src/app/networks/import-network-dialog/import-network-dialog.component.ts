import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-import-network-dialog',
    standalone: true,
    imports: [CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule],
    templateUrl: './import-network-dialog.component.html',
    styleUrl: './import-network-dialog.component.scss'
})
export class ImportNetworkDialogComponent {

    selectedFile: File | null = null;

    constructor(public dialogRef: MatDialogRef<ImportNetworkDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;

        if (input.files && input.files.length) {
            this.selectedFile = input.files[0];
        }
    }

    onImport(): void {
        this.dialogRef.close(this.selectedFile);
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
