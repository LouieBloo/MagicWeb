import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card, CardLocation, BattlefieldRowType } from 'src/app/models/game';

@Injectable({
  providedIn: 'root'
})
export class GameEventService {

  drawCardEvent = new BehaviorSubject<any>(null);
  moveCardEvent = new BehaviorSubject<any>(null);
  rotateCardEvent = new BehaviorSubject<Card>(null);

  constructor() { }


  drawCard() {
    this.drawCardEvent.next(null);
  }

  moveCard(card: Card, newLocation: CardLocation, battlefieldRowType: BattlefieldRowType = null) {
    this.moveCardEvent.next({ card: card, newLocation: newLocation, battlefieldRowType: battlefieldRowType });
  }

  rotateCard(card:Card){
    this.rotateCardEvent.next(card);
  }

}
