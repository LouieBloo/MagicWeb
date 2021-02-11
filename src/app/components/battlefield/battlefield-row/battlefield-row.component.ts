import { Component, OnInit, Input } from '@angular/core';
import { BattlefieldRowType, CardLocation, SelectableObjectType, BattlefieldOwnerType, Player } from 'src/app/models/game';
import { ClickService } from 'src/app/services/game/click/click.service';
import { Selectable } from 'src/app/interfaces/gameInterfaces';

@Component({
  selector: 'app-battlefield-row',
  templateUrl: './battlefield-row.component.html',
  styleUrls: ['./battlefield-row.component.css']
})
export class BattlefieldRowComponent implements OnInit,Selectable {

  @Input() cards: any = []
  @Input() owner:Player;

  @Input() rowType: BattlefieldRowType;
  @Input() scale: number = 1;
  @Input() ownerType: BattlefieldOwnerType;
  
  selectable:boolean = false;

  private defaultScales: any = {
    creature: 2,
    nonCreature: 1.5,
    land: 1
  }

  constructor(private clickService:ClickService) { }

  

  ngOnInit(): void {
    this.setDefaultScale();
  }

  select() {
  }

  deselect() {
  }

  getType():SelectableObjectType{
    return SelectableObjectType.BattlefieldRow;
  }

  getData(){
    return this.rowType;
  }

  isSelectable(){
    return this.clickService.isSelectingTargetObject();
  }

  areCardsClickable(){
    return this.ownerType && this.ownerType == BattlefieldOwnerType.Mine;
  }

  rowClicked(){
    console.log("YES")
    if(this.isSelectable()){
      this.clickService.battlefieldRowClicked(this.rowType,this.owner);
    }
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
