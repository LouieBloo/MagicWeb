import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from 'src/app/models/game';

@Injectable({
  providedIn: 'root'
})
export class GameEventService {

  drawCardEvent = new BehaviorSubject<any>(null);
  exileCardEvent = new BehaviorSubject<Card>(null);
  sendCardToHandEvent = new BehaviorSubject<Card>(null);
  sendCardToGraveyardEvent = new BehaviorSubject<Card>(null);

  constructor() { }


  drawCard() {
    this.drawCardEvent.next(null);
  }

  exileCard(card: Card) {
    this.exileCardEvent.next(card);
  }

  sendCardToHand(card: Card) {
    this.sendCardToHandEvent.next(card);
  }

  sendCardToGraveyard(card: Card) {
    this.sendCardToGraveyardEvent.next(card);
  }
}
