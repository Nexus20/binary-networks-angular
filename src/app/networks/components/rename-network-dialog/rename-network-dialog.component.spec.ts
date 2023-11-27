import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameNetworkDialogComponent } from './rename-network-dialog.component';

describe('RenameNetworkDialogComponent', () => {
  let component: RenameNetworkDialogComponent;
  let fixture: ComponentFixture<RenameNetworkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenameNetworkDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenameNetworkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
