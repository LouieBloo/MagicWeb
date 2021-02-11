import { Component, OnInit, Input } from '@angular/core';
import { Card, BattlefieldOwnerType, CardLocation } from 'src/app/models/game';
import { ClickService } from 'src/app/services/game/click/click.service';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnInit {

  scale:number = 1.8;
  @Input() name:string;
  @Input() cards:Card[];
  @Input() clickCallback:any;
  @Input() ownerType: BattlefieldOwnerType;
  @Input() cardLocation: CardLocation;

  constructor(private clickService:ClickService) { }

  ngOnInit(): void {
  }

  isSelectable(){
    return this.clickService.isSelectingTargetObject() && this.ownerType == BattlefieldOwnerType.Mine;
  }

  clicked(){
    if(this.clickCallback && this.isSelectable()){
      this.clickCallback(this.cards);
    }
  }
}
