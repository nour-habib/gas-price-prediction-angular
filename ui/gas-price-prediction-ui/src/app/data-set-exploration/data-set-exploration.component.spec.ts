import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSetExplorationComponent } from './data-set-exploration.component';

describe('DataSetExplorationComponent', () => {
  let component: DataSetExplorationComponent;
  let fixture: ComponentFixture<DataSetExplorationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSetExplorationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataSetExplorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
