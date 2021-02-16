import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Card, CardLocation, CardContainerManipulation } from 'src/app/models/game';
import { GameEventService } from 'src/app/services/game/game-event/game-event.service';
import { ClickService } from 'src/app/services/game/click/click.service';

@Component({
  selector: 'app-card-finder',
  templateUrl: './card-finder.component.html',
  styleUrls: ['./card-finder.component.css']
})
export class CardFinderComponent implements OnInit, OnDestroy {

  scale: number = 2.6;
  @Input() cards: Card[] = []
  @Input() cardLocation: CardLocation;
  @Input() cardContainerManipulation: CardContainerManipulation;

  constructor(private clickService: ClickService, private gameEventService: GameEventService) { }

  ngOnInit(): void {
    console.log("INSIDE CARD FINDER:",this.cards)
    if (this.cardContainerManipulation == CardContainerManipulation.RevealFind || this.cardContainerManipulation == CardContainerManipulation.Scry) {
      this.cards.forEach(card => {
        card.temporarilyRevealed = true;
      })
    }

  }

  ngOnDestroy(): void {
    if (this.cardContainerManipulation == CardContainerManipulation.RevealFind || this.cardContainerManipulation == CardContainerManipulation.Scry) {
      this.cards.forEach(card => {
        card.temporarilyRevealed = false;
      })
    }
  }

  done() {
    this.clickService.findCardsFinished();
  }

  deckClickEventFired = (payload: any) =>{
    console.log("DECK CLICK EVENT FIRED: ",payload)
    // if(!payload){return;}
    // if (this.cardContainerManipulation == CardContainerManipulation.Scry) {
    //   let foundObject = this.cards.find(obj => {
    //     return obj.id == payload.card.id;
    //   })
    //   if (foundObject) {
    //     let index = this.cards.indexOf(foundObject);
    //     this.cards.splice(index, 1);
    //   }
    // }
  }
}
