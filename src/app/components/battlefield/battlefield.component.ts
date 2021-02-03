import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.css']
})
export class BattlefieldComponent implements OnInit {

  creatureScale:number = 1;
  nonCreatureScale:number = 1;
  landScale:number = 1;

  creatureRow:any = [{},{},{}]
  nonCreatureRow:any = [{},{},{}]
  landRow:any = [{},{},{}]

  constructor() { }

  ngOnInit(): void {
  }

}
