import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNetworkDialogComponent } from './delete-network-dialog.component';

describe('DeleteNetworkDialogComponent', () => {
  let component: DeleteNetworkDialogComponent;
  let fixture: ComponentFixture<DeleteNetworkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteNetworkDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteNetworkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
