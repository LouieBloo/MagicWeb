import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFinderComponent } from './card-finder.component';

describe('CardFinderComponent', () => {
  let component: CardFinderComponent;
  let fixture: ComponentFixture<CardFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
