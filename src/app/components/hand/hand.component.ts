import { Component, OnInit, Input } from '@angular/core';
import { CardLocation, Card } from 'src/app/models/game';
import { GameEventService } from 'src/app/services/game/game-event/game-event.service';
import { ClickService } from 'src/app/services/game/click/click.service';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {

  scale: number = 2.6;
  @Input() cards: Card[] = []

  constructor(private gameEvents: GameEventService,private clickService:ClickService) { }

  ngOnInit() {

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
}
