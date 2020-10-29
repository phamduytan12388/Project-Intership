import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserHawaComponent } from './create-user-hawa.component';

describe('CreateUserHawaComponent', () => {
  let component: CreateUserHawaComponent;
  let fixture: ComponentFixture<CreateUserHawaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserHawaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserHawaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
