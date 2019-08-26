import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekNavComponent } from './week-nav.component';

describe('WeekNavComponent', () => {
  let component: WeekNavComponent;
  let fixture: ComponentFixture<WeekNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
