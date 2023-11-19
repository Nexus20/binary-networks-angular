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
  selector: 'app-network-create-dialog',
  standalone: true,
    imports: [CommonModule, MatDialogTitle, MatDialogContent, ReactiveFormsModule, MatInputModule, MatDialogActions, MatButtonModule],
  templateUrl: './network-create-dialog.component.html',
  styleUrl: './network-create-dialog.component.scss'
})
export class NetworkCreateDialogComponent {

    createNetworkForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<NetworkCreateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.createNetworkForm = this.fb.group({
            networkName: ['', Validators.required],
            firstNodeName: ['', Validators.required]
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onCreate(): void {
        if (this.createNetworkForm.valid) {
            this.dialogRef.close(this.createNetworkForm.value);
        }
    }
}
