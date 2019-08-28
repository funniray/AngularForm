import { TestBed } from '@angular/core/testing';

import { PrintFormService } from './print-form.service';

describe('PrintFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrintFormService = TestBed.get(PrintFormService);
    expect(service).toBeTruthy();
  });
});
