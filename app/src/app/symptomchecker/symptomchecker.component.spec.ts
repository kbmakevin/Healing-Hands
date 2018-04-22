import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomcheckerComponent } from './symptomchecker.component';

describe('SymptomcheckerComponent', () => {
  let component: SymptomcheckerComponent;
  let fixture: ComponentFixture<SymptomcheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymptomcheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomcheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
