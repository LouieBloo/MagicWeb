import { Component, OnInit, HostListener } from '@angular/core';
import * as Colyseus from "colyseus.js"; // not necessary if included via <script> tag.
import { GameEventService } from 'src/app/services/game/game-event/game-event.service';
import { DataChange } from 'colyseus.js';
import { Player, Card, CardLocation, AttachCardEvent, ModifyCounterEvent, KEY_CODES, Stack } from 'src/app/models/game';
import { ClickService } from 'src/app/services/game/click/click.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {


  room: Colyseus.Room;

  me: Player;
  opponents: Player[] = [];
  stack: Stack;


  constructor(private gameEventService: GameEventService, public clickService: ClickService) { }

  ngOnInit(): void {
    this.gameEventService.drawCardEvent.subscribe(this.cardDrawEventFired);
    this.gameEventService.moveCardEvent.subscribe(this.moveCardEventFired);
    this.gameEventService.rotateCardEvent.subscribe(this.rotateCardEventFired);
    this.gameEventService.attachCardEvent.subscribe(this.attachCardEventFired);
    this.gameEventService.modifyCounterEvent.subscribe(this.modifyCounterEventFired);
    this.gameEventService.flipCardEvent.subscribe(this.flipCardEventFired);
    this.gameEventService.importDeckEvent.subscribe(this.importDeckEventFired);
  }


  joinRoom(room: Colyseus.Room) {
    console.log(room.sessionId, "joined", room.name);
    this.room = room;



    this.room.onStateChange((state) => {
      console.log(room.name, "has new state:", state);
      if (!this.stack) {
        this.stack = state.stack;
      }

    });


    //players change
    this.room.state.players.onAdd = (player, key) => {

      if (player.sessionId == room.sessionId) {
        console.log("me loaded..");
        //this.me = JSON.parse(JSON.stringify(player));
        this.me = player;
      } else {
        this.opponents.push(player);
      }

      //  console.log("player: ", player)
      console.log("new player key: ", key)
      //this.players.push(newPlayer)

      // Hand changes, not on card add or remove though...
      player.hand.onChange = function (changes) {
        console.log("hand changed")
      };
      //cards added to a hand
      player.hand.cards.onAdd = (newCard) => {
        console.log("Card addde: ", player.sessionId, newCard)
        //this.me.hand.cards.push(newCard);
      };
      player.hand.cards.onRemove = function (cardToRemove) {
        console.log("Card removed: ", player.sessionId, cardToRemove)
      };

      player.battlefield.exile.cards.onAdd = (newCard) => {
        console.log("EXILEE: ADD", newCard);
      }
    }

    // this.room.state.listen("players/:id/hand/cards", (change: DataChange) => {
    //   console.log("DATA CHANGED!!")
    // })

    this.room.onMessage("message_type", (message) => {
      console.log("message received on", room.name, message);
    });

    this.room.onError((code, message) => {
      console.log("couldn't join " + code, room.name);
    });

    this.room.onLeave((code) => {
      console.log("left " + code, room.name);
    });

  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(!this.clickService.isRespondingToKeyboardPresses()){return;}
    console.log(event.keyCode);
    if (event.keyCode == KEY_CODES.D) {
      this.cardDrawEventFired();
    }
    // if (event.keyCode == KEY_CODE.DOWN_ARROW) {
    //   // Your row selection code
    //   console.log(event.keyCode);
    // }
  }

  cardDrawEventFired = () => {
    if (this.room) {
      this.room.send("cardDraw",{amount:1})
    }
  }

  moveCardEventFired = (payload) => {
    if (!payload) { return; }
    if (payload.card) {
      this.room.send("cardChangeLocation", { card: payload.card, newLocation: payload.newLocation, battlefieldRowType: payload.battlefieldRowType, owner: payload.player });
    }
  }

  rotateCardEventFired = (card: Card) => {
    if (this.room) {
      this.room.send("cardRotated", { card: card })
    }
  }

  flipCardEventFired = (card: Card) => {
    if (this.room) {
      this.room.send("flipCard", { card: card })
    }
  }

  attachCardEventFired = (event: AttachCardEvent) => {
    if (this.room) {
      console.log("ATTACH: ", event)
      this.room.send("cardAttached", event);
    }
  }

  modifyCounterEventFired = (event: ModifyCounterEvent) => {
    if (this.room) {
      this.room.send("createOrModifyCounterOnCard", event);
    }
  }

  importDeckEventFired = (deck:any)=>{
    if(this.room){
      this.room.send("importDeck",{deck:deck});
    }
  }

  leaveRoom() {
    this.room.leave();
  }

  playCard() {
    this.room.send("cardPlayed", { name: "Black" })
  }

}
