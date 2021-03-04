import { Component, OnInit, ViewChild } from '@angular/core';
import * as Colyseus from "colyseus.js"; // not necessary if included via <script> tag.
import { GameComponent } from '../../game/game.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //client = new Colyseus.Client('ws://localhost:2567');
  client = new Colyseus.Client(environment.webSocketUrl);
  room: Colyseus.Room;
  name:string;
  roomId:string;
  error:string;

  @ViewChild('game') game: GameComponent;

  constructor() { }

  ngOnInit(): void {
    this.name = localStorage.getItem('savedPlayerName');
    this.roomId = localStorage.getItem('savedRoomId');
  }

  joinRoom() {
    if(!this.name){
      this.error = "You need a name!"
      return;
    }
    if(!this.roomId){
      this.error = "Invalid room Id"
      return;
    }
    
    this.error = "";

    localStorage.setItem('savedPlayerName', this.name);
    localStorage.setItem('savedRoomId', this.roomId);
    
    this.client.joinOrCreate("my_room", { name: this.name,code:this.roomId}).then(room => {
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

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.joinRoom();
    }
  }

}
