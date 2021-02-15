import { Component, Input, OnInit, Output } from '@angular/core';
import { ClickService } from 'src/app/services/game/click/click.service';
import { CardLocation, Card, SelectableObjectType, CounterTypes } from 'src/app/models/game';
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

  CounterTypes = CounterTypes;

  constructor(private clickService: ClickService, private gameEvents: GameEventService) { }

  ngOnInit() {
  }

  //what image should we be showing
  getImgSource() {
    if (this.card) {
      if (
        this.card.location == CardLocation.Graveyard ||
        this.card.location == CardLocation.Exile ||
        this.card.location == CardLocation.Battlefield ||
        this.card.location == CardLocation.Hand ||
        this.card.location == CardLocation.Stack ||
        this.card.location == CardLocation.AttachedToCard
      ) {
        if (this.card.cardFaces && this.card.cardFaces.length > 0) {
          let index = this.card.flipped ? 1 : 0;
          return this.card.cardFaces[index].image_uris ? this.card.cardFaces[index].image_uris.normal : this.backOfCardImgUrl;
        } else {
          return this.card.image_uris && !this.card.flipped ? this.card.image_uris.normal : this.backOfCardImgUrl;
        }
      }
    }
    return this.backOfCardImgUrl;
  }

  getMainCardScaleCSS() {
    let attachmentAddition = this.card && this.card.attachedCards && this.card.attachedCards.length > 0 ? this.getAttachmentHeightOffset(this.card.attachedCards.length) : 0;
    return {
      width: this.cardRealDimensions.width * this.scale + "px",
      height: (this.cardRealDimensions.height * this.scale) + attachmentAddition + "px"
    }
  }

  getInnerCardScaleCSS() {
    return {
      width: this.cardRealDimensions.width * this.scale + "px",
      height: this.cardRealDimensions.height * this.scale + "px"
    }
  }

  getAttachmentCSS(step: number) {
    if (!this.card) { return; }

    return {
      paddingTop: this.getAttachmentHeightOffset(this.card.attachedCards.length - step) + "px",
    }
  }

  getAttachmentHeightOffset(step: number) {
    return ((step) * (this.cardRealDimensions.height * 0.45)) * this.scale;
  }

  canRespondToClicks() {
    return this.clickService.canCardRespondToClick() && this.clickable;
  }

  cardClicked() {
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
      case CardLocation.AttachedToCard:
        this.clickedInHand();
        break;
      case CardLocation.Stack:
        this.clickedInHand();
        break;
    }
  }

  flip(){
    this.gameEvents.flipCard(this.card);
    console.log(this.card)
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

  getCard() {
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
    this.gameEvents.moveCard(this.card, CardLocation.Exile, null, null);
  }

  sendToHand() {
    this.gameEvents.moveCard(this.card, CardLocation.Hand, null, null);
  }

  sendToGraveyard() {
    this.gameEvents.moveCard(this.card, CardLocation.Graveyard, null, null);
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

  shouldShowBottomButton() {
    if (this.card && this.card.location != CardLocation.AttachedToCard) {
      return true;
    }
  }

  getPictureRotationCSS() {
    if (!this.card) { return; }

    return {
      transform: "rotate(" + this.card.rotation + "deg)"
    }
  }

  getCounterTextCSS() {
    if (!this.card) { return; }

    return {
      fontSize: this.scale * 20 + "px",
      marginTop: this.scale * 12 + "px"
    }
  }

  counterModified = (counterType: CounterTypes, amount: number) => {
    this.gameEvents.modifyCounter(this.card, counterType, amount);
  }

  getCounterString(counterType: CounterTypes): string {
    if (this.card && this.card.counter && this.card.counter.type == counterType) {
      switch (this.card.counter.type) {
        case CounterTypes.OneOne:
          return this.card.counter.amount + "/" + this.card.counter.amount;
        case CounterTypes.General:
          return this.card.counter.amount + "";
      }
    } else {
      switch (counterType) {
        case CounterTypes.OneOne:
          return "1/1";
        case CounterTypes.General:
          return "1"
      }
    }

    return null;
  }
}
