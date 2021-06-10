import { TestBed, inject } from '@angular/core/testing';
import { PeopleService } from './people.service';

describe('PeopleService', () => {
  let service: PeopleService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeopleService]
    });
    service = TestBed.inject(PeopleService);
  });

  it('should be created', inject([PeopleService], (service: PeopleService) => {
    expect(service).toBeTruthy();
  }));
});
