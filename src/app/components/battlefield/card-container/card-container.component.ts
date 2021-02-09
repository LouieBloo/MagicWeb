import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/models/game';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnInit {

  scale:number = 2;
  @Input() name:string;
  @Input() cards:Card[];


  constructor() { }

  ngOnInit(): void {
  }

  
}
