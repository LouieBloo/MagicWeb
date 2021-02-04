import { Component, Input, OnInit, Output } from '@angular/core';
import { ClickService } from 'src/app/services/game/click/click.service';
import { CardLocation } from 'src/app/models/game';
import { Selectable } from 'src/app/interfaces/gameInterfaces';

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.css']
})
export class SingleCardComponent implements OnInit, Selectable {

  @Input() scale: number;
  @Input() location: CardLocation;
  @Output() 

  cardRealDimensions: any = {
    width: 63,
    height: 88
  }
  cardRotated: boolean = false;
  selected:boolean = false;

  constructor(private clickService: ClickService) { }

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

    switch (this.location) {
      case CardLocation.Battlefield:
        this.rotateCard();
        break;
      case CardLocation.Hand:
        this.clickedInHand();
        break;
    }
  }


  select(){
    this.selected = true;
  }

  deselect(){
    this.selected = false;
  }

  sendToGraveyard(){

  }

  rotateCard() {
    this.cardRotated = !this.cardRotated;
  }

  clickedInHand() {
    if(this.selected){
      this.clickService.objectDeselected(this);
    }else{
      this.clickService.objectSelected(this);
    }
  }

}
