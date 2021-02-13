import { Component, OnInit, Input } from '@angular/core';
import { BattlefieldOwnerType, Player, Battlefield, Stack } from 'src/app/models/game';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() opponents:Player[];
  @Input() me:Player;
  @Input() stack:Stack;
  
  scale:number = 4.0;
  BattlefieldOwnerType = BattlefieldOwnerType;

  constructor() { }

  ngOnInit() {
  }

}
