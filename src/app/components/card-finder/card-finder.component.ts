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

  constructor(private clickService: ClickService) { }

  ngOnInit(): void {
    if (this.cardContainerManipulation == CardContainerManipulation.RevealFind) {
      this.cards.forEach(card => {
        card.temporarilyRevealed = true;
      })
    }
  }

  ngOnDestroy(): void {
    if (this.cardContainerManipulation == CardContainerManipulation.RevealFind) {
      this.cards.forEach(card => {
        card.temporarilyRevealed = false;
      })
    }
  }

  done() {
    this.clickService.findCardsFinished();
  }
}
