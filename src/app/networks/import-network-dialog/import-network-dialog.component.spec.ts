import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportNetworkDialogComponent } from './import-network-dialog.component';

describe('ImportNetworkDialogComponent', () => {
  let component: ImportNetworkDialogComponent;
  let fixture: ComponentFixture<ImportNetworkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportNetworkDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportNetworkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
