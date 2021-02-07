import { Component, OnInit, Input } from '@angular/core';
import { BattlefieldRowType, CardLocation } from 'src/app/models/game';

@Component({
  selector: 'app-battlefield-row',
  templateUrl: './battlefield-row.component.html',
  styleUrls: ['./battlefield-row.component.css']
})
export class BattlefieldRowComponent implements OnInit {

  cards: any = []

  @Input() rowType: BattlefieldRowType;
  @Input() scale: number = 1;

  private defaultScales: any = {
    creature: 2,
    nonCreature: 1.5,
    land: 1
  }

  constructor() { }

  

  ngOnInit(): void {
    this.setDefaultScale();
    // this.addCard();
    // this.addCard();
    // this.addCard();
  }

  addCard(){
    this.cards.push({location:CardLocation.Battlefield})
  }

  removeCard(){
    this.cards.splice(0,1);
  }

  setDefaultScale() {
    if (this.rowType == BattlefieldRowType.Creature) {
      this.scale = this.defaultScales.creature;
    } else if (this.rowType == BattlefieldRowType.Noncreature) {
      this.scale = this.defaultScales.nonCreature;
    } else if (this.rowType == BattlefieldRowType.Land) {
      this.scale = this.defaultScales.land;
    }

  }

  scaleChanged = (value) => {
    this.scale = value.value;
  }
}
