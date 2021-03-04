import { Component, OnInit, HostListener } from '@angular/core';
import * as Colyseus from "colyseus.js"; // not necessary if included via <script> tag.
import { GameEventService } from 'src/app/services/game/game-event/game-event.service';
import { DataChange } from 'colyseus.js';
import { Player, Card, CardLocation, KEY_CODES, Stack, CardContainerManipulation } from 'src/app/models/game';
import { ClickService } from 'src/app/services/game/click/click.service';
import { AttachCardEvent, ModifyCounterEvent } from 'src/app/models/events';

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
    this.gameEventService.cardCopiedEvent.subscribe(this.cardCopiedEventFired);
    this.gameEventService.modifyCounterEvent.subscribe(this.modifyCounterEventFired);
    this.gameEventService.modifyPlayerCounterEvent.subscribe(this.modifyPlayerCounterEventFired);
    this.gameEventService.flipCardEvent.subscribe(this.flipCardEventFired);
    this.gameEventService.importDeckEvent.subscribe(this.importDeckEventFired);
    this.gameEventService.shuffleDeckEvent.subscribe(this.shuffleDeckEventFired);
    this.gameEventService.untapAllEvent.subscribe(this.untapAllEventFired);
    this.gameEventService.mulliganEvent.subscribe(this.mulliganEventFired);
    this.gameEventService.chatMessageEvent.subscribe(this.sendChatMessageEventFired);
    this.gameEventService.endTurnEvent.subscribe(this.endTurnEventFired);
    this.gameEventService.startTurnEvent.subscribe(this.startTurnEventFired);
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
        player.deck.onChange = (changes) => {
          console.log("deck changed", changes)
          //hack since the card picker wont update on the broken deck reference
          //this.clickService.findCardsFinished();
        };
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

    this.room.onMessage("chat", (message) => {
      // console.log("message received on", room.name, message);
      this.gameEventService.chatMessageReceived(message);
    });

    this.room.onError((code, message) => {
      console.log("couldn't join " + code, room.name);
    });

    this.room.onLeave((code) => {
      console.log("left " + code, room.name);
      // this.room = null;
      // this.me = null;
      // this.opponents = null;
      // this.stack = null;
      location.reload();
    });

  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(!this.room){return;}
    if (!this.clickService.isRespondingToKeyboardPresses()) { return; }
    console.log(event.keyCode);
    if (event.keyCode == KEY_CODES.D) {
      this.cardDrawEventFired();
    }else if(event.keyCode == KEY_CODES.I){
      this.gameEventService.findCards(null,CardLocation.Inserting,CardContainerManipulation.Insert)
    }else if(event.keyCode == KEY_CODES.U){
      this.untapAllEventFired();
    }else if(event.keyCode == KEY_CODES.T){
      this.gameEventService.startTurn();
    }else if(event.keyCode == KEY_CODES.M){
      this.gameEventService.mulligan();
    }else if(event.keyCode == KEY_CODES.S){
      this.gameEventService.scryClickedEvent.next(1);
    }else if(event.keyCode == KEY_CODES.F){
      this.gameEventService.findInDeckClickedEvent.next(1);
    }else if(event.keyCode == KEY_CODES.Z){
      this.gameEventService.toggleShowingScales();
    }else if(event.keyCode == KEY_CODES.E){
      this.gameEventService.endTurn();
    }
  }

  cardDrawEventFired = () => {
    if (this.room) {
      this.room.send("cardDraw", { amount: 1 })
    }
  }

  moveCardEventFired = (payload) => {
    if (!payload) { return; }
    if (payload.card) {
      this.room.send("cardChangeLocation", { card: payload.card, newLocation: payload.newLocation, battlefieldRowType: payload.battlefieldRowType, owner: payload.player,deckFromLocation:payload.deckFromLocation });
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

  cardCopiedEventFired = (card: Card) => {
    if (this.room) {
      this.room.send("cardCopied", { card: card })
    }
  }

  startTurnEventFired = ()=>{
    if (this.room) {
      this.room.send("startTurn")
    }
  }

  mulliganEventFired = ()=>{
    if (this.room) {
      this.room.send("mulligan")
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

  modifyPlayerCounterEventFired = (event: ModifyCounterEvent) => {
    if (this.room) {
      this.room.send("modifyPlayerCounter", event);
    }
  }

  importDeckEventFired = (deck: any) => {
    if (this.room) {
      this.room.send("importDeck", { deck: deck });
    }
  }

  shuffleDeckEventFired = ()=>{
    if (this.room) {
      this.room.send("shuffleDeck");
    }
  }

  untapAllEventFired = ()=>{
    if (this.room) {
      this.room.send("untapAll");
    }
  }

  sendChatMessageEventFired = (message:string)=>{
    if(this.room){
      this.room.send("chat",{message:message});
    }
  }

  leaveRoom() {
    this.room.leave();
  }

  playCard() {
    this.room.send("cardPlayed", { name: "Black" })
  }

  endTurnEventFired = ()=>{
    if (this.room) {
      this.room.send("endTurn");
    }
  }

}
