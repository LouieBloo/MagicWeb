import { Component, OnInit } from '@angular/core';
import { CardLocation } from 'src/app/models/game';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {

  scale:number = 2.8;
  cards:any = []

  constructor() { }

  ngOnInit() {
    this.addCard();
    this.addCard();
    this.addCard();
    this.addCard();
    this.addCard();
    this.addCard();
    this.addCard();
  }

  addCard(){
    this.cards.push({location:CardLocation.Hand})
  }

  removeCard(){
    this.cards.splice(0,1);
  }

}
