import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDeckModalComponent } from './import-deck-modal.component';

describe('ImportDeckModalComponent', () => {
  let component: ImportDeckModalComponent;
  let fixture: ComponentFixture<ImportDeckModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportDeckModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportDeckModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
