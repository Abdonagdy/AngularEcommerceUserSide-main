import { TestBed } from '@angular/core/testing';

import { SanganService } from './sangan.service';

describe('ReversationService', () => {
  let service: SanganService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanganService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
