import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { modelResultsResolver } from './model-results.resolver';

describe('modelResultsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => modelResultsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
