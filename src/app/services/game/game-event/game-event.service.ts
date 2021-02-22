import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card, CardLocation, BattlefieldRowType, Player, AttachCardEvent, ModifyCounterEvent, Counter, CounterTypes, FindCardsEvent, CardContainerManipulation, DeckFromLocation } from 'src/app/models/game';

@Injectable({
  providedIn: 'root'
})
export class GameEventService {

  drawCardEvent = new BehaviorSubject<any>(null);
  moveCardEvent = new BehaviorSubject<any>(null);
  rotateCardEvent = new BehaviorSubject<Card>(null);
  flipCardEvent = new BehaviorSubject<Card>(null);
  cardCopiedEvent = new BehaviorSubject<Card>(null);
  attachCardEvent = new BehaviorSubject<AttachCardEvent>(null);
  modifyCounterEvent = new BehaviorSubject<ModifyCounterEvent>(null);
  importDeckEvent = new BehaviorSubject<any>(null);
  findCardsEvent = new BehaviorSubject<FindCardsEvent>(null);
  shuffleDeckEvent = new BehaviorSubject<any>(null);
  modifyPlayerCounterEvent = new BehaviorSubject<ModifyCounterEvent>(null);
  untapAllEvent = new BehaviorSubject<any>(null);
  mulliganEvent = new BehaviorSubject<any>(null);

  isShowingScales = false;
  showingScales = new BehaviorSubject<boolean>(this.isShowingScales);

  constructor() { }


  drawCard() {
    this.drawCardEvent.next(null);
  }

  moveCard(card: Card, newLocation: CardLocation, battlefieldRowType: BattlefieldRowType = null, player: Player,deckFromLocation:DeckFromLocation = null) {
    this.moveCardEvent.next({ card: card, newLocation: newLocation, battlefieldRowType: battlefieldRowType, player: player,deckFromLocation:deckFromLocation });
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

  importDeck(deck:any){
    this.importDeckEvent.next(deck);
  }

  findCards(cards:Card[],cardLocation:CardLocation,cardContainerManipulation:CardContainerManipulation){
    this.findCardsEvent.next({cards:cards,cardLocation:cardLocation,cardContainerManipulation:cardContainerManipulation});
  }

  shuffleDeck(){
    this.shuffleDeckEvent.next(null);
  }
  
  modifyPlayerCounter(counterType: CounterTypes, amount: number,playerId:string = null) {
    this.modifyPlayerCounterEvent.next({counterType: counterType, amount: amount,playerId:playerId });
  }

  cardCopied(card:Card){
    this.cardCopiedEvent.next(card);
  }

  untapAll(){
    this.untapAllEvent.next(null);
  }

  mulligan(){
    this.mulliganEvent.next(null);
  }

  startTurn(){
    this.untapAll();
    this.drawCard();
  }

  toggleShowingScales(){
    this.isShowingScales = !this.isShowingScales;
    this.showingScales.next(this.isShowingScales);
  }
}
