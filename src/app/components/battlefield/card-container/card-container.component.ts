import { Component, OnInit, Input } from '@angular/core';
import { Card, BattlefieldOwnerType, CardLocation, SelectableObjectType } from 'src/app/models/game';
import { ClickService } from 'src/app/services/game/click/click.service';
import { Selectable } from 'src/app/interfaces/gameInterfaces';
import { GameEventService } from 'src/app/services/game/game-event/game-event.service';
import { MatDialog } from '@angular/material';
import { ImportDeckModalComponent } from '../../modals/import-deck-modal/import-deck-modal.component';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnInit, Selectable {
  

  scale:number = 1.8;
  @Input() name:string;
  @Input() cards:Card[];
  @Input() clickCallback:any;
  @Input() ownerType: BattlefieldOwnerType;
  @Input() cardLocation: CardLocation;

  selected: boolean = false;

  cardRealDimensions: any = {
    width: 63,
    height: 88
  }

  constructor(private clickService:ClickService,private gameEventService:GameEventService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  isSelectable(){
    return this.clickService.isSelectingTargetObject() && this.ownerType == BattlefieldOwnerType.Mine;
  }

  clicked(event){
    if(this.clickCallback && this.isSelectable()){
      this.clickCallback(this.cards);
    }else{
      event.stopPropagation();
      if (this.selected) {
        this.clickService.objectDeselected(this);
      } else {
        this.clickService.objectSelected(this);
      }
    }
  }

  getScaleCSS() {
    return {
      width: this.cardRealDimensions.width * this.scale + "px",
      height: this.cardRealDimensions.height * this.scale + "px"
    }
  }

  select() {
    this.selected = true;
  }
  deselect() {
    this.selected = false;
  }
  getType(): SelectableObjectType {
    return SelectableObjectType.Deck;
  }
  getData() {
    throw new Error("Method not implemented.");
  }
  getCard(): Card {
    throw new Error("Method not implemented.");
  }

  importClicked(){
    this.dialog.open(ImportDeckModalComponent);
  }
}
