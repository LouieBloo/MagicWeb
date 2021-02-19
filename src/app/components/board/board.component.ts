import { Component, OnInit, Input } from '@angular/core';
import { BattlefieldOwnerType, Player, Battlefield, Stack, FindCardsEvent } from 'src/app/models/game';
import { GameEventService } from 'src/app/services/game/game-event/game-event.service';
import { ClickService } from 'src/app/services/game/click/click.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() opponents: Player[];
  @Input() me: Player;
  @Input() stack: Stack;


  scale: number = 4.0;
  BattlefieldOwnerType = BattlefieldOwnerType;

  findingCards: boolean = false;
  findCardsEvent: FindCardsEvent;

  constructor(private gameEventService: GameEventService,private clickService:ClickService) { }

  ngOnInit() {
    this.gameEventService.findCardsEvent.subscribe(this.findCardsEventFired);
  }

  findCardsEventFired = (event: FindCardsEvent) => {
    if (!event) { return; }

    //if we get passed in a null location that means we need to close
    if (event.cardLocation == null) {
      this.findCardsEvent = null;
      this.findingCards = false;
    } else if (this.findCardsEvent && this.findCardsEvent.cardLocation == event.cardLocation) {
      //same event fired twice, means to close
      //this.clickService.findCardsFinished();
    } else {
      this.findCardsEvent = event;
      this.findingCards = true;
    }
  }

}
