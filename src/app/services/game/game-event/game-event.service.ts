import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Card, CardLocation, BattlefieldRowType, Player, Counter, CounterTypes, CardContainerManipulation, DeckFromLocation } from 'src/app/models/game';
import { AttachCardEvent, ModifyCounterEvent, FindCardsEvent, ScaleChangedEvent } from 'src/app/models/events';

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
  scaleEvent = new BehaviorSubject<ScaleChangedEvent>({
    handScale:2.6,
    landScale:1.35,
    nonCreatureScale:1.5,
    creatureScale:2
  });
  public scryClickedEvent = new Subject();
  public findInDeckClickedEvent = new Subject();
  
  public chatMessageEvent = new Subject();
  public chatMessageReceivedEvent = new Subject();

  public startTurnEvent = new Subject();
  public endTurnEvent = new Subject();

  isShowingScales = false;
  showingScales = new BehaviorSubject<boolean>(this.isShowingScales);

  constructor() { }


  drawCard() {
    this.drawCardEvent.next(1);
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
    this.startTurnEvent.next();
  }

  toggleShowingScales(){
    this.isShowingScales = !this.isShowingScales;
    this.showingScales.next(this.isShowingScales);
  }

  sendChatMessage(message:string){
    this.chatMessageEvent.next(message);
  }

  chatMessageReceived(event:any){
    this.chatMessageReceivedEvent.next(event);
  }

  scaleChanged(newScale:ScaleChangedEvent){
    this.scaleEvent.next(newScale);
  }

  endTurn(){
    this.endTurnEvent.next();
  }
}
