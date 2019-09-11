import { TestBed } from '@angular/core/testing';

import { AppDataHandlerService } from './app-data-handler.service';

describe('AppDataHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppDataHandlerService = TestBed.get(AppDataHandlerService);
    expect(service).toBeTruthy();
  });
});
