import { Component, OnInit, Input } from '@angular/core';
import { CounterTypes } from 'src/app/models/game';

@Component({
  selector: 'app-counter-modifier',
  templateUrl: './counter-modifier.component.html',
  styleUrls: ['./counter-modifier.component.css']
})
export class CounterModifierComponent implements OnInit {

  @Input() callback:any;
  @Input() counterType:CounterTypes;
  @Input() text:string;
  constructor() { }

  ngOnInit(): void {
  }

  modifyOneOneCounter(amount: number, event) {
    event.stopPropagation();
    if(this.callback){
      this.callback(this.counterType,amount)
    }
  }
}
