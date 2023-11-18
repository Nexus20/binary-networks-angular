import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNodeDialogComponent } from './edit-node-dialog.component';

describe('EditNodeDialogComponentComponent', () => {
  let component: EditNodeDialogComponent;
  let fixture: ComponentFixture<EditNodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNodeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
