import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CardLocation, Card, CardContainerManipulation } from 'src/app/models/game';
import { GameEventService } from 'src/app/services/game/game-event/game-event.service';
import { ClickService } from 'src/app/services/game/click/click.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit,OnDestroy {

  scale: number = 2.6;
  @Input() cards: Card[] = []
  showScaleSubscription: Subscription;
  showingScale:boolean = false;

  constructor(private gameEvents: GameEventService,private clickService:ClickService) { }

  ngOnInit() {
    this.showScaleSubscription = this.gameEvents.showingScales.subscribe(this.showingScaleChanged);
  }

  ngOnDestroy(): void {
    if(this.showScaleSubscription){
      this.showScaleSubscription.unsubscribe();
    }
  }

  showingScaleChanged= (isShowingScale:boolean)=>{
    this.showingScale = isShowingScale;
  }

  addCard(card: Card) {
    card.rotation = 0;
    card.location = CardLocation.Hand;
    this.cards.push(card);
  }

  drawCard() {
    this.gameEvents.drawCard();
  }

  isSelectable(){
    return this.clickService.isSelectingTargetObject();
  }
 
  rowClicked(){
    if(this.isSelectable()){
      this.clickService.handClicked();
    }
  }

  insertToken(){
    this.gameEvents.findCards(null,CardLocation.Inserting,CardContainerManipulation.Insert)
  }

  untapAll(){
    this.gameEvents.untapAll();
  }

  startTurn(){
    this.gameEvents.startTurn();
  }

  mulligan(){
    this.gameEvents.mulligan();
  }

  toggleShowScales(){
    this.gameEvents.toggleShowingScales();
  }

  findInDeck(){
    this.gameEvents.scryClickedEvent.next(1);
  }

  scry(){
    this.gameEvents.scryClickedEvent.next(1);
  }
}
