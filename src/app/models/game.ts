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
    Deck = "Deck",
}
export enum CounterTypes {
    OneOne = "OneOne",
    Poison = "Poison",
    Health = "Health",
    CommanderDamage = "CommanderDamage",
    General = "General"
}
export enum KEY_CODES {
    UP_ARROW = 38,
    DOWN_ARROW = 40,
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37,
    D=68
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
export interface Stack {
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
    counter?:Counter;
    cardFaces?:CardFace[];
    flipped?:boolean;
}

export interface CardFace{
    name?: string;
    image_uris?: any;
}

export interface Hand {
    cards?: Card[];
}

export interface Deck {
    cards?: Card[];
}

export interface Player {
    name?: string;
    sessionId?: string;
    deck?: Deck;
    hand?: Hand;
    battlefield?:Battlefield;
}

export interface AttachCardEvent {
    targetCard:Card;
    sourceCard:Card;
}
export interface ModifyCounterEvent {
    targetCard:Card;
    counterType:CounterTypes;
    amount:number;
}

export interface Counter {
    type?: CounterTypes;
    amount?: number;
}