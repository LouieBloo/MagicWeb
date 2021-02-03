import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.css']
})
export class SingleCardComponent implements OnInit {

  cardRealDimensions:any = {
    width:63,
    height:88
  }

  @Input() scale:number;

  constructor() { }

  ngOnInit() {
  }

  getOuterStyles(){
    return {
      width:this.cardRealDimensions.width * this.scale + "px",
      height:this.cardRealDimensions.height * this.scale + "px"
    }
  }

}
