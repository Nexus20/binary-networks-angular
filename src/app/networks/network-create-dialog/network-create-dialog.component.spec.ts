import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkCreateDialogComponent } from './network-create-dialog.component';

describe('NetworkCreateDialogComponent', () => {
  let component: NetworkCreateDialogComponent;
  let fixture: ComponentFixture<NetworkCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkCreateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NetworkCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
