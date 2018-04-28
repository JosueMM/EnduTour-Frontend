import { TestBed, inject } from '@angular/core/testing';

import { RutUserService } from './rut-user.service';

describe('RutUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RutUserService]
    });
  });

  it('should be created', inject([RutUserService], (service: RutUserService) => {
    expect(service).toBeTruthy();
  }));
});
