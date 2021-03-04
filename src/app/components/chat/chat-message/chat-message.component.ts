import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from 'src/app/models/game';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: ChatMessage;

  constructor() { }

  ngOnInit(): void {
  }

  getPlayerNameClass(){
    if(this.message.playerId){
      return ['playerColor']
    }else{
      return ['gameColor']
    }
  }

}
