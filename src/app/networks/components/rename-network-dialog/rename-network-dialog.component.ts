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
  selector: 'app-rename-network-dialog',
  standalone: true,
    imports: [CommonModule, FormsModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './rename-network-dialog.component.html',
  styleUrl: './rename-network-dialog.component.scss'
})
export class RenameNetworkDialogComponent {
  renameNetworkForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<RenameNetworkDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {
        currentNetworkName: string
      }) {
    this.renameNetworkForm = this.fb.group({
      networkName: [data.currentNetworkName, Validators.required]
    });
  }

  onSave(): void {
    this.dialogRef.close(this.renameNetworkForm.value);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
