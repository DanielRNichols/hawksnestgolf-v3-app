import {IEvent} from "./IEvent";
import {IPlayer} from "./IPlayer";

export interface IEntry {
    id : number;
    eventId : number;
    event? : IEvent;
    playerId : number;
    player? : IPlayer;
    pickNumber : number;
    entryName? : string;
}
