import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupStudentListComponent } from './group-student-list.component';

describe('GroupStudentListComponent', () => {
  let component: GroupStudentListComponent;
  let fixture: ComponentFixture<GroupStudentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupStudentListComponent]
    });
    fixture = TestBed.createComponent(GroupStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
