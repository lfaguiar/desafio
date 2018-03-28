import { TestBed, inject } from '@angular/core/testing';

import { OutroService } from './outro.service';

describe('OutroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutroService]
    });
  });

  it('should be created', inject([OutroService], (service: OutroService) => {
    expect(service).toBeTruthy();
  }));
});
