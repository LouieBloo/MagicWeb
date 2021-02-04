import { Component, OnInit } from '@angular/core';
import { BattlefieldOwnerType } from 'src/app/models/game';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  scale:number = 4.0;

  opponentBattlefields:any = [{ownerType:BattlefieldOwnerType.Theirs},{ownerType:BattlefieldOwnerType.Theirs}]
  myBattlefield:any = {ownerType:BattlefieldOwnerType.Mine}

  constructor() { }

  ngOnInit() {
  }

}
