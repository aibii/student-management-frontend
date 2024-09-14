import { TestBed } from '@angular/core/testing';

import { GroupStudentService } from './group-student.service';

describe('GroupStudentService', () => {
  let service: GroupStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
