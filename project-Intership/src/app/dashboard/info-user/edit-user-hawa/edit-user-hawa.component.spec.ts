import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserHawaComponent } from './edit-user-hawa.component';

describe('EditUserHawaComponent', () => {
  let component: EditUserHawaComponent;
  let fixture: ComponentFixture<EditUserHawaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserHawaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserHawaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
