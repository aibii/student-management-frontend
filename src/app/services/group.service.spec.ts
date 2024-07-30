import { TestBed } from '@angular/core/testing';

import { ClassGroupService } from './group.service';

describe('GroupService', () => {
  let service: ClassGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
