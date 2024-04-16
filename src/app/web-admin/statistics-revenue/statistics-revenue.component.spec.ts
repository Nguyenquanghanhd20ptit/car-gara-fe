import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsRevenueComponent } from './statistics-revenue.component';

describe('StatisticsRevenueComponent', () => {
  let component: StatisticsRevenueComponent;
  let fixture: ComponentFixture<StatisticsRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
