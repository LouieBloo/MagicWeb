import { Component, OnInit, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { Card, CardLocation, CardContainerManipulation } from 'src/app/models/game';
import { GameEventService } from 'src/app/services/game/game-event/game-event.service';
import { ClickService } from 'src/app/services/game/click/click.service';
import { Subscription } from 'rxjs';

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

  moveCardSubscription: Subscription;
  //so jank i hate it
  skipFirstSubscription: boolean = true;

  constructor(private clickService: ClickService, private gameEventService: GameEventService) { }

  ngOnInit(): void {
    if (this.cardContainerManipulation == CardContainerManipulation.RevealFind || this.cardContainerManipulation == CardContainerManipulation.Scry) {
      this.cards.forEach(card => {
        card.temporarilyRevealed = true;
      })
    }

    this.moveCardSubscription = this.gameEventService.moveCardEvent.subscribe(this.moveCardEventFired);

  }

  ngOnDestroy(): void {
    if (this.cardContainerManipulation == CardContainerManipulation.RevealFind || this.cardContainerManipulation == CardContainerManipulation.Scry) {
      this.cards.forEach(card => {
        card.temporarilyRevealed = false;
      })
    }

    if (this.moveCardSubscription) {
      this.moveCardSubscription.unsubscribe();
    }
  }

  done() {
    this.clickService.findCardsFinished();
  }

  moveCardEventFired = (payload: any) => {
    if (!this.skipFirstSubscription && payload) {
      if (this.cardContainerManipulation == CardContainerManipulation.Scry) {
        let foundObject = this.cards.find(obj => {
          return obj.id == payload.card.id;
        })
        if (foundObject) {
          foundObject.temporarilyRevealed = false;
          let index = this.cards.indexOf(foundObject);
          this.cards.splice(index, 1);
        }

        if (!this.cards || this.cards.length < 1) {
          this.done();
        }
      }else{
        if (!this.cards || this.cards.length == 1) {
          this.done();
        }
      }

     
    }
    this.skipFirstSubscription = false;

  }
}
