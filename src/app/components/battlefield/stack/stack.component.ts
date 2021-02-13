import { Component, OnInit, Input } from '@angular/core';
import { Stack } from 'src/app/models/game';
import { ClickService } from 'src/app/services/game/click/click.service';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {

  scale: number = 2.2;

  @Input() stack: Stack;

  cardRealDimensions: any = {
    width: 63,
    height: 88
  }

  constructor(private clickService: ClickService) { }

  ngOnInit(): void {
  }

  isSelectable() {
    return this.clickService.isSelectingTargetObject();
  }

  clicked() {
    if (this.isSelectable()) {
      this.clickService.stackSelected();
    }
  }

  getAttachmentCSS(step: number) {
    if (!this.stack) { return; }

    return {
      left: this.getAttachmentWidthOffset(-step) + "px",
    }
  }

  getStackHeight(){
    return{
      height:this.scale*50 + "px"
    }
  }

  getAttachmentWidthOffset(step: number) {
    return step * 25 * this.scale;
  }
}
