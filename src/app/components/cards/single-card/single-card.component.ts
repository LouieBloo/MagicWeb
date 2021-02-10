import { Component, Input, OnInit, Output } from '@angular/core';
import { ClickService } from 'src/app/services/game/click/click.service';
import { CardLocation, Card, SelectableObjectType } from 'src/app/models/game';
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
  @Input() clickable: boolean = true;

  cardRealDimensions: any = {
    width: 63,
    height: 88
  }
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
    if (!this.clickService.canCardRespondToClick() || !this.clickable) { return; }

    switch (this.card.location) {
      case CardLocation.Battlefield:
        this.clickedInHand();
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

  getType(): SelectableObjectType {
    return SelectableObjectType.Card;
  }

  getData() {
    return this.card;
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

  inBattlefield() {
    return this.card && this.card.location == CardLocation.Battlefield;
  }

  sendToExile() {
    this.gameEvents.moveCard(this.card, CardLocation.Exile);
  }

  sendToHand() {
    this.gameEvents.moveCard(this.card, CardLocation.Hand);
  }

  sendToGraveyard() {
    this.gameEvents.moveCard(this.card, CardLocation.Graveyard);
  }

  rotateCard() {
    this.gameEvents.rotateCard(this.card);
  }

  clickedInHand() {
    if (this.selected) {
      this.clickService.objectDeselected(this);
    } else {
      this.clickService.objectSelected(this);
    }
  }

  topHalfClicked() {
    if (!this.clickService.canCardRespondToClick()) { return; }

    if (this.card && this.card.location == CardLocation.Battlefield) {
      this.cardClicked();
    } else {
      this.cardClicked();
    }
  }
  bottomHalfClicked() {
    if (!this.clickService.canCardRespondToClick()) { return; }

    if (this.card && this.card.location == CardLocation.Battlefield) {
      this.rotateCard();
    } else {
      this.cardClicked();
    }
  }


  getPictureRotationCSS(){
    if(!this.card){return;}

    return {
      transform:"rotate(" + this.card.rotation + "deg)"
    }
  }
}
