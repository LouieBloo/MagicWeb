import { Component, OnInit, ViewChild } from '@angular/core';
import * as Colyseus from "colyseus.js"; // not necessary if included via <script> tag.
import { GameComponent } from '../../game/game.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  client = new Colyseus.Client('ws://localhost:2567');
  room: Colyseus.Room;

  @ViewChild('game') game: GameComponent;

  constructor() { }

  ngOnInit(): void {
  }


  joinRoom() {
    this.client.joinOrCreate("my_room", { name: "ass man" }).then(room => {
      this.room = room;
      this.game.joinRoom(room);
    }).catch(e => {
      console.log("JOIN ERROR", e);
    });
  }

  leaveRoom() {
    // this.room.leave();
  }

  playCard() {
    // this.room.send("cardPlayed", { name: "Black" })
  }
}
