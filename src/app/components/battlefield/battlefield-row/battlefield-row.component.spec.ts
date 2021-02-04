import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlefieldRowComponent } from './battlefield-row.component';

describe('BattlefieldRowComponent', () => {
  let component: BattlefieldRowComponent;
  let fixture: ComponentFixture<BattlefieldRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlefieldRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlefieldRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
