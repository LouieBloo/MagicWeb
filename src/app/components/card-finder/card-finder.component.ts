import { Component, OnInit, Input, OnDestroy, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Card, CardLocation, CardContainerManipulation } from 'src/app/models/game';
import { GameEventService } from 'src/app/services/game/game-event/game-event.service';
import { ClickService } from 'src/app/services/game/click/click.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth-service.service';

@Component({
  selector: 'app-card-finder',
  templateUrl: './card-finder.component.html',
  styleUrls: ['./card-finder.component.css']
})
export class CardFinderComponent implements OnInit, OnDestroy {

  scale: number = 2.6;
  searchString: string;
  @Input() cards: Card[] = []
  @Input() cardLocation: CardLocation;
  @Input() cardContainerManipulation: CardContainerManipulation;

  private contentPlaceholder: ElementRef;
  @ViewChild('searchBox',{static:false}) set content(content: ElementRef) {
    if(content) { // initially setter gets called with undefined
        this.contentPlaceholder = content;
        setTimeout(()=>{this.contentPlaceholder.nativeElement.focus();},50);
    }
 }

  moveCardSubscription: Subscription;
  //so jank i hate it
  skipFirstSubscription: boolean = true;

  constructor(private clickService: ClickService, private gameEventService: GameEventService,private authService:AuthService) { }

  ngOnInit(): void {
    this.clickService.modalOpened();
    if (this.cardContainerManipulation == CardContainerManipulation.RevealFind || this.cardContainerManipulation == CardContainerManipulation.Scry) {
      this.cards.forEach(card => {
        card.temporarilyRevealed = true;
      })
    }

    this.moveCardSubscription = this.gameEventService.moveCardEvent.subscribe(this.moveCardEventFired);
    window.scrollTo(0,document.body.scrollHeight);
  }

  ngOnDestroy(): void {
    this.clickService.modalClosed();
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
      } else {
        if (!this.cards || this.cards.length == 1) {
          this.done();
        }
      }


    }
    this.skipFirstSubscription = false;

  }

  search = async() =>{
    if (!this.searchString) { return; }
    let response = await this.authService.request('get', '/search', {
      search: this.searchString
    }).subscribe(data => {
      if(data.cards && data.cards.length > 0){
        data.cards.forEach(card=>{
          card.location = CardLocation.Inserting
          card.disc_id = card.id;
        })
        this.cards = data.cards;
      }else{
        this.cards = [];
      }
    }, error => {
      console.log("Error searching deck: ", error)
    })
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.search();
    }
  }

  showSearch(){
    if(this.cardLocation == CardLocation.Inserting){
      return true;
    }
    return false;
  }
}
