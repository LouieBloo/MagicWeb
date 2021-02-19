import { Component, OnInit, Input } from '@angular/core';
import { ClickService } from 'src/app/services/game/click/click.service';
import { BattlefieldRowType, BattlefieldOwnerType, Battlefield, CardLocation, Player, DeckFromLocation } from 'src/app/models/game';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.css']
})
export class BattlefieldComponent implements OnInit {

  @Input() ownerType: BattlefieldOwnerType;
  @Input() battlefield: Battlefield;
  @Input() owner:Player;

  cardRealDimensions: any = {
    width: 63,
    height: 88
  }

  rows: any = [];

  constructor(public clickService: ClickService) { }

  ngOnInit(): void {
    this.setRowTypes();
  }

  setRowTypes() {
    if (this.ownerType == BattlefieldOwnerType.Mine) {
      this.rows = [{ rowType: BattlefieldRowType.Creature }, { rowType: BattlefieldRowType.Noncreature }, { rowType: BattlefieldRowType.Land }]
    } else {
      this.rows = [{ rowType: BattlefieldRowType.Land }, { rowType: BattlefieldRowType.Noncreature }, { rowType: BattlefieldRowType.Creature }]
    }
  }

  getCards(row) {
    if (!row || !this.battlefield) { return; }

    if (row.rowType == BattlefieldRowType.Creature) {
      return this.battlefield.battlefieldRows.Creature.cards;
    }
    if (row.rowType == BattlefieldRowType.Land) {
      return this.battlefield.battlefieldRows.Land.cards;
    }
    if (row.rowType == BattlefieldRowType.Noncreature) {
      return this.battlefield.battlefieldRows.Noncreature.cards;
    }
  }

  getOuterStyles() {
    return {
      width: this.cardRealDimensions.width * 1.8 + "px",
      height: this.cardRealDimensions.height * 1.8 + "px"
    }
  }

  graveyardClicked(){
    if(this.clickService.isSelectingTargetObject()){
      this.clickService.graveyardSelected();
    }
  }

  exileClicked(){
    if(this.clickService.isSelectingTargetObject()){
      this.clickService.exileSelected();
    }
  }

  deckClicked(deckFromLocation:DeckFromLocation){
    if(this.clickService.isSelectingTargetObject()){
      this.clickService.deckSelected(deckFromLocation);
    }
  }

  commandZoneClicked(){
    if(this.clickService.isSelectingTargetObject()){
      this.clickService.commandZoneSelected();
    }
  }
}
