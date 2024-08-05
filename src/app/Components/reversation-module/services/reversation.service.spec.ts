import { TestBed } from '@angular/core/testing';

import { ReversationService } from './reversation.service';

describe('ReversationService', () => {
  let service: ReversationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReversationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
