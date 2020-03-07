import {IEntry} from "./IEntry";
import {IGolfer} from "./IGolfer";

export interface IPick {
    id : number;
    entryId : number;
    entry? : IEntry;
    golferId : number;
    golfer? : IGolfer;
    round : number;
}
