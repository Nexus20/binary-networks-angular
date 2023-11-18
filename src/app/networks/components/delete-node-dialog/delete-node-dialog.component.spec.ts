import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNodeDialogComponent } from './delete-node-dialog.component';

describe('DeleteNodeDialogComponentComponent', () => {
  let component: DeleteNodeDialogComponent;
  let fixture: ComponentFixture<DeleteNodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteNodeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteNodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
