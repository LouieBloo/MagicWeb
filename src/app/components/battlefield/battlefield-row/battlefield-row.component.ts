import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BattlefieldRowType, CardLocation, SelectableObjectType, BattlefieldOwnerType, Player } from 'src/app/models/game';
import { ClickService } from 'src/app/services/game/click/click.service';
import { Selectable } from 'src/app/interfaces/gameInterfaces';
import { Subscription } from 'rxjs';
import { GameEventService } from 'src/app/services/game/game-event/game-event.service';
import { ScaleChangedEvent } from 'src/app/models/events';

@Component({
  selector: 'app-battlefield-row',
  templateUrl: './battlefield-row.component.html',
  styleUrls: ['./battlefield-row.component.css']
})
export class BattlefieldRowComponent implements OnInit, OnDestroy, Selectable {


  @Input() cards: any = []
  @Input() owner: Player;

  @Input() rowType: BattlefieldRowType;
  @Input() scale: number = 1;
  @Input() ownerType: BattlefieldOwnerType;

  selectable: boolean = false;

  showScaleSubscription: Subscription;
  showingScale: boolean = false;

  private defaultScales: any = {
    creature: 2,
    nonCreature: 1.5,
    land: 1.35
  }

  constructor(private clickService: ClickService, private gameEventService: GameEventService) { }



  ngOnInit(): void {
    this.setDefaultScale();
    this.showScaleSubscription = this.gameEventService.showingScales.subscribe(this.showingScaleChanged);

    this.gameEventService.scaleEvent.subscribe((newScales: ScaleChangedEvent) => {
      switch (this.rowType) {
        case BattlefieldRowType.Creature:
          this.scale = newScales.creatureScale;
          return;
        case BattlefieldRowType.Land:
          this.scale = newScales.landScale;
          return;
        case BattlefieldRowType.Noncreature:
          this.scale = newScales.nonCreatureScale;
          return;
      }
    })
  }

  ngOnDestroy(): void {
    if (this.showScaleSubscription) {
      this.showScaleSubscription.unsubscribe();
    }
  }

  showingScaleChanged = (isShowingScale: boolean) => {
    this.showingScale = isShowingScale;
  }

  select() {
  }

  deselect() {
  }

  getType(): SelectableObjectType {
    return SelectableObjectType.BattlefieldRow;
  }

  getData() {
    return this.rowType;
  }

  getCard() {
    return null;
  }

  isSelectable() {
    return this.clickService.isSelectingTargetObject();
  }

  areCardsClickable() {
    return this.ownerType && this.ownerType == BattlefieldOwnerType.Mine;
  }

  rowClicked() {
    if (this.isSelectable()) {
      this.clickService.battlefieldRowClicked(this.rowType, this.owner);
    }
  }

  setDefaultScale() {
    if (this.rowType == BattlefieldRowType.Creature) {
      this.scale = this.defaultScales.creature;
    } else if (this.rowType == BattlefieldRowType.Noncreature) {
      this.scale = this.defaultScales.nonCreature;
    } else if (this.rowType == BattlefieldRowType.Land) {
      this.scale = this.defaultScales.land;
    }

  }

  scaleChanged = (value) => {
    this.scale = value.value;
  }
}
