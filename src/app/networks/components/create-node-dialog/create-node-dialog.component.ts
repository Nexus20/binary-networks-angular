import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-create-node-dialog',
  standalone: true,
    imports: [CommonModule, FormsModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './create-node-dialog.component.html',
  styleUrl: './create-node-dialog.component.scss'
})
export class CreateNodeDialogComponent {
    addNodeForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<CreateNodeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.addNodeForm = this.fb.group({
            label: ['', Validators.required]
        });
    }

    onSave(): void {
        this.dialogRef.close(this.addNodeForm.value);
    }

    onDismiss(): void {
        this.dialogRef.close();
    }
}
