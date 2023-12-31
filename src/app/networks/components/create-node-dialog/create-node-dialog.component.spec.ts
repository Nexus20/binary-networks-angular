import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNodeDialogComponent } from './create-node-dialog.component';

describe('CreateNodeDialogComponentComponent', () => {
  let component: CreateNodeDialogComponent;
  let fixture: ComponentFixture<CreateNodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNodeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
