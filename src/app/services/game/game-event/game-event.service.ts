import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card, CardLocation, BattlefieldRowType, Player, AttachCardEvent, ModifyCounterEvent, Counter, CounterTypes } from 'src/app/models/game';

@Injectable({
  providedIn: 'root'
})
export class GameEventService {

  drawCardEvent = new BehaviorSubject<any>(null);
  moveCardEvent = new BehaviorSubject<any>(null);
  rotateCardEvent = new BehaviorSubject<Card>(null);
  flipCardEvent = new BehaviorSubject<Card>(null);
  attachCardEvent = new BehaviorSubject<AttachCardEvent>(null);
  modifyCounterEvent = new BehaviorSubject<ModifyCounterEvent>(null);

  constructor() { }


  drawCard() {
    this.drawCardEvent.next(null);
  }

  moveCard(card: Card, newLocation: CardLocation, battlefieldRowType: BattlefieldRowType = null, player: Player) {
    this.moveCardEvent.next({ card: card, newLocation: newLocation, battlefieldRowType: battlefieldRowType, player: player });
  }

  rotateCard(card: Card) {
    this.rotateCardEvent.next(card);
  }

  attachCard(targetCard: Card, sourceCard: Card) {
    this.attachCardEvent.next({ targetCard: targetCard, sourceCard: sourceCard });
  }

  modifyCounter(targetCard: Card, counterType: CounterTypes, amount: number) {
    this.modifyCounterEvent.next({ targetCard: targetCard, counterType: counterType, amount: amount });
  }

  flipCard(card: Card) {
    this.flipCardEvent.next(card);
  }


}
