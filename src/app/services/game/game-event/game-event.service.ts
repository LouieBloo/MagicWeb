import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card, CardLocation, BattlefieldRowType, Player, AttachCardEvent } from 'src/app/models/game';

@Injectable({
  providedIn: 'root'
})
export class GameEventService {

  drawCardEvent = new BehaviorSubject<any>(null);
  moveCardEvent = new BehaviorSubject<any>(null);
  rotateCardEvent = new BehaviorSubject<Card>(null);
  attachCardEvent = new BehaviorSubject<AttachCardEvent>(null);

  constructor() { }


  drawCard() {
    this.drawCardEvent.next(null);
  }

  moveCard(card: Card, newLocation: CardLocation, battlefieldRowType: BattlefieldRowType = null,player: Player) {
    this.moveCardEvent.next({ card: card, newLocation: newLocation, battlefieldRowType: battlefieldRowType,player:player });
  }

  rotateCard(card:Card){
    this.rotateCardEvent.next(card);
  }

  attachCard(targetCard:Card,sourceCard:Card){
    this.attachCardEvent.next({targetCard:targetCard,sourceCard:sourceCard});
  }

}
