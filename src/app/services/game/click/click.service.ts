import { Injectable } from '@angular/core';
import { Selectable } from 'src/app/interfaces/gameInterfaces';
import { SelectableObjectType, Battlefield, BattlefieldRowType, CardLocation, BattlefieldOwnerType, Player } from 'src/app/models/game';
import { GameEventService } from '../game-event/game-event.service';

@Injectable({
  providedIn: 'root'
})
export class ClickService {

  private selectedObject: Selectable;

  private cardsRespondingToClicks: boolean = true;
  private selectingTargetObject: boolean = false;

  private respondingToKeyboardPresses: boolean = true;

  // private resettingOnClick = { resetting: false, skipOne: false };

  constructor(private gameEventService: GameEventService) { }

  public topLevelClickRecieved() {
    // if (this.resettingOnClick.skipOne) {
    //   this.resettingOnClick.skipOne = false;
    // }
    // else if (this.resettingOnClick.resetting) {
    this.resetToNormal();
    // this.resettingOnClick.resetting = false;
    //    }
  }

  public objectSelected(selectedObject: Selectable) {

    //2 cards are selected, attach
    if (this.isSelectedObjectACard() && this.selectedObject.getType() == SelectableObjectType.Card) {
      this.gameEventService.attachCard(selectedObject.getCard(),this.selectedObject.getCard());
      this.resetToNormal();
    } else {
      this.deselectObject();

      this.selectedObject = selectedObject;
      this.selectedObject.select();

      if (this.isSelectedObjectACard()) {
        // this.resettingOnClick = { resetting: true, skipOne: true };
        this.selectingTargetObject = true;
      }
    }
  }

  public objectDeselected(selectedObject: Selectable) {
    if (this.selectedObject == selectedObject) {
      this.resetToNormal();
    } else {
      console.error("deletect not the same")
    }
  }

  public modalOpened(){
    this.respondingToKeyboardPresses = false;
  }

  public modalClosed(){
    this.respondingToKeyboardPresses = true;
  }

  public isRespondingToKeyboardPresses():boolean{
    return this.respondingToKeyboardPresses;
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
    // this.resettingOnClick = { resetting: false, skipOne: false };
  }

  private isSelectedObjectACard() {
    if (this.selectedObject && this.selectedObject.getType() == SelectableObjectType.Card) {
      return true;
    }
    return false;
  }

  public canCardRespondToClick(): boolean {
    return this.cardsRespondingToClicks;
  }

  public isSelectingTargetObject(): boolean {
    return this.selectingTargetObject;
  }

  public battlefieldRowClicked(battlefieldRowType: BattlefieldRowType, player: Player) {
    if (this.isSelectedObjectACard()) {
      this.gameEventService.moveCard(this.selectedObject.getData(), CardLocation.Battlefield, battlefieldRowType, player);
      this.resetToNormal();
    }
  }

  public handClicked() {
    if (this.isSelectedObjectACard()) {
      this.gameEventService.moveCard(this.selectedObject.getData(), CardLocation.Hand, null, null);
      this.resetToNormal();
    }
  }

  public graveyardSelected() {
    if (this.isSelectedObjectACard()) {
      this.gameEventService.moveCard(this.selectedObject.getData(), CardLocation.Graveyard, null, null);
      this.resetToNormal();
    }
  }

  public exileSelected() {
    if (this.isSelectedObjectACard()) {
      this.gameEventService.moveCard(this.selectedObject.getData(), CardLocation.Exile, null, null);
      this.resetToNormal();
    }
  }

  public deckSelected() {
    if (this.isSelectedObjectACard()) {
      this.gameEventService.moveCard(this.selectedObject.getData(), CardLocation.Deck, null, null);
      this.resetToNormal();
    }
  }

  public stackSelected() {
    if (this.isSelectedObjectACard()) {
      this.gameEventService.moveCard(this.selectedObject.getData(), CardLocation.Stack, null, null);
      this.resetToNormal();
    }
  }
}
