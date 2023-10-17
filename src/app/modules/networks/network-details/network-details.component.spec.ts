import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkDetailsComponent } from './network-details.component';

describe('NetworkDetailsComponent', () => {
  let component: NetworkDetailsComponent;
  let fixture: ComponentFixture<NetworkDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkDetailsComponent]
    });
    fixture = TestBed.createComponent(NetworkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
