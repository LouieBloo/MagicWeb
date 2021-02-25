import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { GameEventService } from 'src/app/services/game/game-event/game-event.service';
import { ClickService } from 'src/app/services/game/click/click.service';
import { ChatMessage } from 'src/app/models/game';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild("messageWindow") messageWindow:ElementRef;

  message:string = "";
  allMessages:ChatMessage[] = [];

  toggled:boolean = true;

  constructor(private gameEventService:GameEventService,private clickService:ClickService) { }

  ngOnInit(): void {
    this.gameEventService.chatMessageReceivedEvent.subscribe(this.chatMessageReceived);
  }

  sendMessage = ()=>{
    if(!this.message || this.message.length < 1){return;}

    this.gameEventService.sendChatMessage(this.message);

    this.message = "";

    setTimeout(() => {
      this.messageWindow.nativeElement.scrollTop = this.messageWindow.nativeElement.scrollHeight;  
    }, 50);
    
  }

  chatMessageReceived = (message:ChatMessage)=>{
    this.allMessages.push(message);

    setTimeout(() => {
      this.messageWindow.nativeElement.scrollTop = this.messageWindow.nativeElement.scrollHeight;  
    }, 50);
  }

  chatBoxFocused(){
    this.clickService.modalOpened();
  }

  chatBoxDeFocused(){
    this.clickService.modalClosed();
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }

  toggleSize(){
    this.toggled = !this.toggled;
  }


}
