import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {

  scale:number = 1;
  cards:any = [{},{},{},{},{},{},{}]

  constructor() { }

  ngOnInit() {
  }

  addCard(){
    this.cards.push({})
  }

  removeCard(){
    this.cards.splice(0,1);
  }

}
