import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterModifierComponent } from './counter-modifier.component';

describe('CounterModifierComponent', () => {
  let component: CounterModifierComponent;
  let fixture: ComponentFixture<CounterModifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterModifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
