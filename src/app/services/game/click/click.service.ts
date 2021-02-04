import { Injectable } from '@angular/core';
import { Selectable } from 'src/app/interfaces/gameInterfaces';

@Injectable({
  providedIn: 'root'
})
export class ClickService {

  private selectedObject:Selectable;

  private cardsRespondingToClicks:boolean = true;
  private battlefieldRowsRespondingToClicks:boolean = false;

  constructor() { }

  public generalClickReceived(){
    console.log("got it")
  }

  public objectSelected(selectedObject:Selectable ){
    if(this.selectedObject){
      this.deselectObject();
    }

    this.selectedObject = selectedObject;
    this.selectedObject.select();
  }

  public objectDeselected(selectedObject:Selectable){
    if(this.selectedObject == selectedObject){
      this.deselectObject();
    }else{
      console.error("deletect not the same")
    }
  }

  private deselectObject(){
    this.selectedObject.deselect();
    this.selectedObject = null;
  }

  public resetToNormal(){
    this.cardsRespondingToClicks = true;
    this.battlefieldRowsRespondingToClicks = false;
  }

  public battlefieldRowsRespondToClicks(){
    this.cardsRespondingToClicks = false;
    this.battlefieldRowsRespondingToClicks = true;
  }

  public canCardRespondToClick():boolean{
    return this.cardsRespondingToClicks;
  }

  public canBattlefieldRowsRespondToClicks():boolean{
    return this.battlefieldRowsRespondingToClicks;
  }
}
