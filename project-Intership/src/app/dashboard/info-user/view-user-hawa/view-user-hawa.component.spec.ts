import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserHawaComponent } from './view-user-hawa.component';

describe('ViewUserHawaComponent', () => {
  let component: ViewUserHawaComponent;
  let fixture: ComponentFixture<ViewUserHawaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserHawaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserHawaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
