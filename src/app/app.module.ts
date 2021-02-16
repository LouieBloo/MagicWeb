import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GestureConfig,MatButtonModule,MatDialogModule,MatFormFieldModule,MatInputModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { SingleCardComponent } from './components/cards/single-card/single-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { HandComponent } from './components/hand/hand.component';
import { BattlefieldComponent } from './components/battlefield/battlefield.component';
import { BattlefieldRowComponent } from './components/battlefield/battlefield-row/battlefield-row.component';
import { GameComponent } from './components/game/game.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CardContainerComponent } from './components/battlefield/card-container/card-container.component';
import { CounterModifierComponent } from './components/counter-modifier/counter-modifier.component';
import { StackComponent } from './components/battlefield/stack/stack.component';
import { ImportDeckModalComponent } from './components/modals/import-deck-modal/import-deck-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { CardFinderComponent } from './components/card-finder/card-finder.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SingleCardComponent,
    HandComponent,
    BattlefieldComponent,
    BattlefieldRowComponent,
    GameComponent,
    HomeComponent,
    CardContainerComponent,
    CounterModifierComponent,
    StackComponent,
    ImportDeckModalComponent,
    CardFinderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    HammerModule,
    HttpClientModule
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
