import { Component, OnInit, Input } from '@angular/core';
import { BattlefieldOwnerType, Player } from 'src/app/models/game';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() me:Player;
  
  scale:number = 4.0;

  opponentBattlefields:any = []
  myBattlefield:any = {ownerType:BattlefieldOwnerType.Mine}

  constructor() { }

  ngOnInit() {
  }

}
