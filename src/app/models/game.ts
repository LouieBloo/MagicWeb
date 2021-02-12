import { HandComponent } from '../components/hand/hand.component';

export enum BattlefieldRowType {
    Creature = "Creature",
    Noncreature = "Noncreature",
    Land = "Land"
}
export enum BattlefieldOwnerType {
    Mine = "Mine",
    Theirs = "Theirs"
}
export enum CardLocation {
    Hand = "Hand",
    Battlefield = "Battlefield",
    Graveyard = "Graveyard",
    Exile = "Exile",
    Stack = "Stack",
    Deck = "Deck",
    AttachedToCard="AttachedToCard"
}
export enum SelectableObjectType {
    Card = "Card",
    BattlefieldRow = "BattlefieldRow",
}


export interface Battlefield {
    battlefieldRows?: any;
    graveyard?: Graveyard;
    exile?: Exile;
}

export interface BattlefieldRow {
    type?: BattlefieldRowType;
    cards?: Card[];
}

export interface Graveyard {
    cards?: Card[];
}

export interface Exile {
    cards?: Card[];
}

export interface Card {
    rotation?: number;
    id?: string;
    location?: CardLocation;
    name?: string;
    owner?:string;
    image_uris?:any;
    attachedCards?:Card[];
    attachedToCardId?: string;
}

export interface Hand {
    cards?: Card[];
}

export interface Player {
    name?: string;
    sessionId?: string;
    hand?: Hand;
    battlefield?:Battlefield;
}

export interface AttachCardEvent {
    targetCard:Card;
    sourceCard:Card;
}