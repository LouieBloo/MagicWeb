import { Component, OnInit, Input } from '@angular/core';
import { ClickService } from 'src/app/services/game/click/click.service';
import { BattlefieldRowType, BattlefieldOwnerType } from 'src/app/models/game';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.css']
})
export class BattlefieldComponent implements OnInit {

  @Input() ownerType:BattlefieldOwnerType;

  rows:any = [];

  constructor(public clickService:ClickService) { }

  ngOnInit(): void {
    this.setRowTypes();
  }

  setRowTypes(){
    if(this.ownerType == BattlefieldOwnerType.Mine){
      this.rows = [{rowType:BattlefieldRowType.Creature},{rowType:BattlefieldRowType.Noncreature},{rowType:BattlefieldRowType.Land}]
    }else{
      this.rows = [{rowType:BattlefieldRowType.Land},{rowType:BattlefieldRowType.Noncreature},{rowType:BattlefieldRowType.Creature}]
    }
  }

  rowClicked(){
    console.log("row clicked")
  }
}
