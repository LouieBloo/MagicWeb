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
  name:string = "Lukey";

  @ViewChild('game') game: GameComponent;

  constructor() { }

  ngOnInit(): void {
  }

  joinRoom() {
    if(!this.name){return;}
    this.client.joinOrCreate("my_room", { name: this.name}).then(room => {
      this.room = room;
      this.game.joinRoom(room);
    }).catch(e => {
      console.log("JOIN ERROR", e);
    });
  }

  leaveRoom() {
    this.room.leave();
    this.room = null;
  }

}
