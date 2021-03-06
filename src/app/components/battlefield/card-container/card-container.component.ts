import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Card, BattlefieldOwnerType, CardLocation, SelectableObjectType, CardContainerManipulation, DeckFromLocation, CounterTypes } from 'src/app/models/game';
import { ClickService } from 'src/app/services/game/click/click.service';
import { Selectable } from 'src/app/interfaces/gameInterfaces';
import { GameEventService } from 'src/app/services/game/game-event/game-event.service';
import { MatDialog } from '@angular/material';
import { ImportDeckModalComponent } from '../../modals/import-deck-modal/import-deck-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnInit,OnDestroy, Selectable {


  scale: number = 1.5;
  @Input() name: string;
  @Input() cards: Card[];
  @Input() clickCallback: any;
  @Input() ownerType: BattlefieldOwnerType;
  @Input() cardLocation: CardLocation;

  selected: boolean = false;
  amountToPutCard:number = 1;

  scryEventSubscription: Subscription;
  findInDeckEventSubscription: Subscription;

  cardRealDimensions: any = {
    width: 63,
    height: 88
  }

  showingTooltip:boolean = true;

  constructor(private clickService: ClickService, private gameEventService: GameEventService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.ownerType == BattlefieldOwnerType.Mine && this.cardLocation == CardLocation.Deck){
      this.scryEventSubscription = this.gameEventService.scryClickedEvent.subscribe((amount)=>{this.scryClicked(null,amount)})
      this.findInDeckEventSubscription = this.gameEventService.findInDeckClickedEvent.subscribe(()=>{this.findInDeckClicked()})
    }
  }

  ngOnDestroy(){
    if(this.scryEventSubscription){
      this.scryEventSubscription.unsubscribe();
    }
    if(this.findInDeckEventSubscription){
      this.findInDeckEventSubscription.unsubscribe();
    }
  }

  isSelectable() {
    return this.clickService.isSelectingTargetObject() && this.ownerType == BattlefieldOwnerType.Mine;
  }

  clicked(event,deckFromLocation:DeckFromLocation = null) {
    if (this.clickCallback && this.isSelectable()) {
      this.clickCallback(deckFromLocation);
    } else {
      event.stopPropagation();
      if (this.cardLocation == CardLocation.Deck && this.ownerType == BattlefieldOwnerType.Mine) {
        if (this.selected) {
          this.clickService.objectDeselected(this);
        } else {
          this.clickService.objectSelected(this);
        }
      } else {
        this.find();
      }
    }

    this.showingTooltip = false;
  }

  getScaleCSS() {
    if(this.cardLocation == CardLocation.Trash){return;}
    return {
      width: this.cardRealDimensions.width * this.scale + "px",
      height: this.cardRealDimensions.height * this.scale + "px"
    }
  }

  select() {
    this.selected = true;
  }
  deselect() {
    this.selected = false;
  }
  getType(): SelectableObjectType {
    return SelectableObjectType.Deck;
  }
  getData() {
    throw new Error("Method not implemented.");
  }
  getCard(): Card {
    throw new Error("Method not implemented.");
  }

  importClicked() {
    this.dialog.open(ImportDeckModalComponent);
  }

  find(){
    if(!this.cards || this.cards.length < 1){return;}
    if(this.ownerType == BattlefieldOwnerType.Theirs && this.cardLocation == CardLocation.Deck){return;}
    this.clickService.findCards(this.cards, this.cardLocation,CardContainerManipulation.Find);
  }

  findInDeckClicked() {
    if(!this.cards || this.cards.length < 1){return;}
    this.clickService.findCards(this.cards, this.cardLocation,CardContainerManipulation.RevealFind);
  }

  amountToPutCardModified = (counterType: CounterTypes, amount: number) => {
    this.amountToPutCard += amount;
    if(this.amountToPutCard <= 0){
      this.amountToPutCard = 1;
    }
  }

  // insertClicked(){
  //   if(!this.cards || this.cards.length < 1){return;}
  //   this.clickService.findCards(this.cards, this.cardLocation,CardContainerManipulation.Insert);
  // }

  scryClicked = (event,amount = null)=>{
    if(event){event.stopPropagation();}
    
    if(!this.cards || this.cards.length < 1){return;}
    let scryCards:Card[] = [];

    let amountToScry = amount || this.amountToPutCard;
    
    for(let x = 0;x<amountToScry;x++){
      if(x < this.cards.length){
        scryCards.push(this.cards[x]);
      }
    }
    this.clickService.findCards(scryCards, this.cardLocation,CardContainerManipulation.Scry);
    this.amountToPutCard = 1;
  }

  topHalfClicked = (event)=> {
    event.stopPropagation();
    this.clicked(event,{amount:this.amountToPutCard,fromTop:true})
    this.amountToPutCard = 1;
  }

  bottomHalfClicked = (event) =>{
    event.stopPropagation();
    this.clicked(event,{amount:this.amountToPutCard,fromTop:false})
    this.amountToPutCard = 1;
  }

  modifyAmount = (event,amount)=>{
    event.stopPropagation();
    this.amountToPutCard += amount;
    if(this.amountToPutCard <= 0){
      this.amountToPutCard = 1;
    }
  }

  getText():string{
    if(this.cardLocation == CardLocation.CommandZone || this.cardLocation == CardLocation.Trash){
      return this.getFilteredName(this.cardLocation);
    }else{
      return this.getFilteredName(this.cardLocation) + " (" + (this.cards ? this.cards.length : 0) + ")";
    }
  }

  getFilteredName(location:CardLocation):string{
    if(location == CardLocation.CommandZone){
      return "Command";
    }else{
      return location;
    }
  }

  shuffleClicked(){
    this.gameEventService.shuffleDeck();
  }

  hideTooltip(event:any){
    event.stopPropagation();
    this.showingTooltip = false;
  }
}
