import { Component, OnInit } from '@angular/core';
import * as Colyseus from "colyseus.js"; // not necessary if included via <script> tag.
import { GameEventService } from 'src/app/services/game/game-event/game-event.service';
import { DataChange } from 'colyseus.js';
import { Player } from 'src/app/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {


  room: Colyseus.Room;

  me:Player;
  opponents: Player[] = [];

  constructor(private gameEventService: GameEventService) { }

  ngOnInit(): void {
    this.gameEventService.drawCardEvent.subscribe(this.cardDrawEventFired);
    this.gameEventService.exileCardEvent.subscribe(this.exileCardEventFired);
    this.gameEventService.sendCardToHandEvent.subscribe(this.sendCardToHandEvent);
    this.gameEventService.sendCardToGraveyardEvent.subscribe(this.sendCardToGraveyardEvent);
  }


  joinRoom(room: Colyseus.Room) {
    console.log(room.sessionId, "joined", room.name);
    this.room = room;

    this.room.onStateChange((state) => {
      console.log(room.name, "has new state:", state);
    });


    //players change
    this.room.state.players.onAdd = (player, key) => {

      if(player.sessionId == room.sessionId){
        console.log("me loaded..");
        //this.me = JSON.parse(JSON.stringify(player));
        this.me = player;
      }else{
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
      player.hand.cards.onAdd =  (newCard)=> {
        console.log("Card addde: ", player.sessionId, newCard)
        //this.me.hand.cards.push(newCard);
      };
      player.hand.cards.onRemove = function (cardToRemove) {
        console.log("Card removed: ", player.sessionId, cardToRemove)
      };

      player.battlefield.exile.cards.onAdd = (newCard)=>{
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

  cardDrawEventFired = () => {
    console.log("card draw event fired");
    if (this.room) {
      this.room.send("cardDraw")
    }
  }

  exileCardEventFired = (card)=>{
    console.log("exile card event: ",card)
    if (card) {
      this.room.send("exileCard",{card:card});
    }
  }

  sendCardToHandEvent = (card)=>{
    if(card){
      this.room.send("sendCardToHand",{card:card});
    }
  }

  sendCardToGraveyardEvent = (card)=>{
    if(card){
      this.room.send("sendCardToGraveyard",{card:card});
    }
  }

  leaveRoom() {
    this.room.leave();
  }

  playCard() {
    this.room.send("cardPlayed", { name: "Black" })
  }

}
