import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorAnalysisComponent } from './error-analysis.component';

describe('ErrorAnalysisComponent', () => {
  let component: ErrorAnalysisComponent;
  let fixture: ComponentFixture<ErrorAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
