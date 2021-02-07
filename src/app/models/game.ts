import { HandComponent } from '../components/hand/hand.component';

export enum BattlefieldRowType {
    Creature="Creature",
    Noncreature="Noncreature",
    Land="Land"
}

export enum BattlefieldOwnerType {
    Mine ="Mine",
    Theirs="Theirs"
}

export enum CardLocation {
    Hand="Hand",
    Battlefield="Battlefield",
    Graveyard="Graveyard",
    Exile="Exile",
    Stack="Stack"
}

export interface Card{
    rotation?:number;
    id?:string;
    location?:CardLocation;
    name?:string;
}

export interface Hand{
    cards?:Card[];
}

export interface Player{
    name?:string;
    sessionId?:string;
    hand?:Hand;
}