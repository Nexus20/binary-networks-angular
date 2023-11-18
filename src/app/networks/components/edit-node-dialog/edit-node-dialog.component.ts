import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-edit-node-dialog',
  standalone: true,
    imports: [CommonModule, MatDialogTitle, MatDialogContent, ReactiveFormsModule, MatInputModule, MatDialogActions, MatButtonModule],
  templateUrl: './edit-node-dialog.component.html',
  styleUrl: './edit-node-dialog.component.scss'
})
export class EditNodeDialogComponent {

    editNodeForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<EditNodeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.editNodeForm = this.fb.group({
            label: [data.label, Validators.required]
        });
    }

    onSave(): void {
        this.dialogRef.close(this.editNodeForm.value);
    }

    onDismiss(): void {
        this.dialogRef.close();
    }
}
