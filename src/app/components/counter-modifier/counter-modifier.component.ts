import { Component, OnInit, Input } from '@angular/core';
import { CounterTypes, BattlefieldOwnerType } from 'src/app/models/game';

@Component({
  selector: 'app-counter-modifier',
  templateUrl: './counter-modifier.component.html',
  styleUrls: ['./counter-modifier.component.css']
})
export class CounterModifierComponent implements OnInit {

  @Input() callback:any;
  @Input() counterType:CounterTypes;
  @Input() text:string;
  @Input() id:string;
  @Input() icon:string;
  @Input() ownerType:BattlefieldOwnerType;

  constructor() { }

  ngOnInit(): void {
  }

  modifyOneOneCounter(amount: number, event) {
    event.stopPropagation();
    if(this.callback){
      this.callback(this.counterType,amount,this.id)
    }
  }

  isDisabled(){
    if(!this.ownerType || this.ownerType == BattlefieldOwnerType.Mine){
      return false;
    }
    return true;
  }
}
