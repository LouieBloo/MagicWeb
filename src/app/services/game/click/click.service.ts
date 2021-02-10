import { Injectable } from '@angular/core';
import { Selectable } from 'src/app/interfaces/gameInterfaces';
import { SelectableObjectType, Battlefield, BattlefieldRowType, CardLocation } from 'src/app/models/game';
import { GameEventService } from '../game-event/game-event.service';

@Injectable({
  providedIn: 'root'
})
export class ClickService {

  private selectedObject: Selectable;

  private cardsRespondingToClicks: boolean = true;
  private selectingTargetObject: boolean = false;

  private resettingOnClick = { resetting: false, skipOne: false };

  constructor(private gameEventService: GameEventService) { }

  public topLevelClickRecieved() {
    if (this.resettingOnClick.skipOne) {
      this.resettingOnClick.skipOne = false;
    }
    else if (this.resettingOnClick.resetting) {
      this.resetToNormal();
      this.resettingOnClick.resetting = false;
    }
  }

  public objectSelected(selectedObject: Selectable) {
    this.deselectObject();

    this.selectedObject = selectedObject;
    this.selectedObject.select();

    if (this.selectedObject.getType() == SelectableObjectType.Card) {
      this.resettingOnClick = { resetting: true, skipOne: true };
      this.selectingTargetObject = true;
    }
  }

  public objectDeselected(selectedObject: Selectable) {
    if (this.selectedObject == selectedObject) {
      //this.resetToNormal();
    } else {
      console.error("deletect not the same")
    }
  }

  private deselectObject() {
    if (this.selectedObject) {
      this.selectedObject.deselect();
    }
    this.selectedObject = null;
  }

  public resetToNormal() {
    this.deselectObject();
    this.cardsRespondingToClicks = true;
    this.selectingTargetObject = false;
  }

  // public battlefieldRowsRespondToClicks() {
    
  // }

  public canCardRespondToClick(): boolean {
    return this.cardsRespondingToClicks;
  }

  public isSelectingTargetObject(): boolean {
    return this.selectingTargetObject;
  }

  public battlefieldRowClicked(battlefieldRowType: BattlefieldRowType) {
    if (this.selectedObject && this.selectedObject.getType() == SelectableObjectType.Card) {
      this.gameEventService.moveCard(this.selectedObject.getData(), CardLocation.Battlefield, battlefieldRowType);
    }
  }

  public graveyardSelected(){
    if (this.selectedObject && this.selectedObject.getType() == SelectableObjectType.Card) {
      this.gameEventService.moveCard(this.selectedObject.getData(), CardLocation.Graveyard);
    }
  }

  public exileSelected(){
    if (this.selectedObject && this.selectedObject.getType() == SelectableObjectType.Card) {
      this.gameEventService.moveCard(this.selectedObject.getData(), CardLocation.Exile);
    }
  }
}
