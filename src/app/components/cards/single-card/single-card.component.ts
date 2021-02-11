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
  //rows, card containers, etc can dictate if a card is clickable or not
  @Input() clickable: boolean = true;

  backOfCardImgUrl: string = "https://i.redd.it/qnnotlcehu731.jpg"

  cardRealDimensions: any = {
    width: 63,
    height: 88
  }
  selected: boolean = false;

  constructor(private clickService: ClickService, private gameEvents: GameEventService) { }

  ngOnInit() {
  }

  getImgSource() {
    if (this.card) {
      if (
        this.card.location == CardLocation.Graveyard || 
        this.card.location == CardLocation.Exile || 
        this.card.location == CardLocation.Battlefield || 
        this.card.location == CardLocation.Hand || 
        this.card.location == CardLocation.Stack
      ) {
        return this.card.image_uris ? this.card.image_uris.normal : this.backOfCardImgUrl;
      }
    }
    return this.backOfCardImgUrl;
  }

  getOuterStyles() {

    return {
      width: this.cardRealDimensions.width * this.scale + "px",
      height: this.cardRealDimensions.height * this.scale + "px"
    }
  }

  canRespondToClicks() {
    return this.clickService.canCardRespondToClick() && this.clickable;
  }

  cardClicked() {
    console.log("hand clicked")
    if (!this.canRespondToClicks()) { return; }

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
    this.gameEvents.moveCard(this.card, CardLocation.Exile,null,null);
  }

  sendToHand() {
    this.gameEvents.moveCard(this.card, CardLocation.Hand,null,null);
  }

  sendToGraveyard() {
    this.gameEvents.moveCard(this.card, CardLocation.Graveyard,null,null);
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

  topHalfClicked(event) {
    console.log("event: ",event);
    
    if (!this.clickService.canCardRespondToClick()) { return; }
    event.stopPropagation();

    if (this.card && this.card.location == CardLocation.Battlefield) {
      this.cardClicked();
    } else {
      this.cardClicked();
    }
  }
  bottomHalfClicked(event) {
    if (!this.clickService.canCardRespondToClick()) { return; }
    event.stopPropagation();

    if (this.card && this.card.location == CardLocation.Battlefield) {
      this.rotateCard();
    } else {
      this.cardClicked();
    }
  }


  getPictureRotationCSS() {
    if (!this.card) { return; }

    return {
      transform: "rotate(" + this.card.rotation + "deg)"
    }
  }
}
