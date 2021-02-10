import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/models/game';
import { ClickService } from 'src/app/services/game/click/click.service';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnInit {

  scale:number = 2;
  @Input() name:string;
  @Input() cards:Card[];
  @Input() clickCallback:any;

  constructor(private clickService:ClickService) { }

  ngOnInit(): void {
  }

  isSelectable(){
    return this.clickService.isSelectingTargetObject();
  }

  clicked(){
    if(this.clickCallback){
      this.clickCallback(this.cards);
    }
  }
}
