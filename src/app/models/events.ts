import { Card, CounterTypes, CardLocation, CardContainerManipulation } from './game';

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

export interface ScaleChangedEvent{
    handScale?:number;
    landScale?:number;
    nonCreatureScale?:number;
    creatureScale?:number;
}