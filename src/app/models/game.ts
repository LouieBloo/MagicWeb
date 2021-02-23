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
    AttachedToCard="AttachedToCard",
    CommandZone="CommandZone",
    Inserting="Inserting",
    Trash="Trash"
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
export enum CardContainerManipulation {
    Insert = "Insert",
    Scry = "Scry",
    Find = "Find",
    RevealFind = "RevealFind"
}

export enum KEY_CODES {
    UP_ARROW = 38,
    DOWN_ARROW = 40,
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37,
    D=68,
    I=73,
    U=85,
    T=84,
    M=77,
    Z=90,
    S=83,
    F=70
}

export interface Battlefield {
    battlefieldRows?: any;
    graveyard?: Graveyard;
    exile?: Exile;
    commandZone?:CommandZone;
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
export interface CommandZone {
    cards?: Card[];
}
export interface Stack {
    cards?: Card[];
}

export interface Card {
    rotation?: number;
    id?: string;
    disc_id?:string;
    location?: CardLocation;
    name?: string;
    owner?:string;
    image_uris?:any;
    attachedCards?:Card[];
    attachedToCardId?: string;
    counter?:Counter;
    card_faces?:CardFace[];
    flipped?:boolean;
    temporarilyRevealed?:boolean;
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

export interface DeckFromLocation {
    amount:number;
    fromTop:boolean;
}

export interface Player {
    name?: string;
    sessionId?: string;
    deck?: Deck;
    hand?: Hand;
    battlefield?:Battlefield;
    health?:Counter;
    poison?:Counter;
    commanderDamages?:any;
}

export interface AttachCardEvent {
    targetCard:Card;
    sourceCard:Card;
}
export interface ModifyCounterEvent {
    targetCard?:Card;
    counterType:CounterTypes;
    amount:number;
    playerId?:string;
}
export interface FindCardsEvent{
    cards?:Card[];
    cardLocation?:CardLocation;
    cardContainerManipulation?:CardContainerManipulation;
}

export interface Counter {
    type?: CounterTypes;
    amount?: number;
}