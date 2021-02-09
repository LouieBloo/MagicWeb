import { Component, Input, OnInit, Output } from '@angular/core';
import { ClickService } from 'src/app/services/game/click/click.service';
import { CardLocation, Card } from 'src/app/models/game';
import { Selectable } from 'src/app/interfaces/gameInterfaces';
import { GameEventService } from 'src/app/services/game/game-event/game-event.service';

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.css']
})
export class SingleCardComponent implements OnInit, Selectable {

  @Input() scale: number;
  @Input() card: Card;

  cardRealDimensions: any = {
    width: 63,
    height: 88
  }
  cardRotated: boolean = false;
  selected: boolean = false;

  constructor(private clickService: ClickService, private gameEvents: GameEventService) { }

  ngOnInit() {
  }

  getOuterStyles() {

    return {
      width: this.cardRealDimensions.width * this.scale + "px",
      height: this.cardRealDimensions.height * this.scale + "px"
    }
  }

  cardClicked() {
    if (!this.clickService.canCardRespondToClick()) { return; }

    switch (this.card.location) {
      case CardLocation.Battlefield:
        this.rotateCard();
        break;
      case CardLocation.Hand:
        this.clickedInHand();
        break;
      case CardLocation.Exile:
        this.clickedInHand();
        break;
      case CardLocation.Graveyard:
        this.clickedInHand();
        break;
    }
  }


  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }

  inHand() {
    return this.card && this.card.location == CardLocation.Hand;
  }

  inGraveyard() {
    return this.card && this.card.location == CardLocation.Graveyard;
  }

  inExile() {
    return this.card && this.card.location == CardLocation.Exile;
  }

  sendToExile() {
    this.gameEvents.exileCard(this.card);
  }

  sendToHand() {
    this.gameEvents.sendCardToHand(this.card);
  }

  sendToGraveyard() {
    this.gameEvents.sendCardToGraveyard(this.card);
  }

  rotateCard() {
    this.cardRotated = !this.cardRotated;
  }

  clickedInHand() {
    if (this.selected) {
      this.clickService.objectDeselected(this);
    } else {
      this.clickService.objectSelected(this);
    }
  }

}
