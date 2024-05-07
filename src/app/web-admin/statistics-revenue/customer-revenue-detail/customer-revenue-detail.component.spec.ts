import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRevenueDetailComponent } from './customer-revenue-detail.component';

describe('CustomerRevenueDetailComponent', () => {
  let component: CustomerRevenueDetailComponent;
  let fixture: ComponentFixture<CustomerRevenueDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRevenueDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRevenueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
