import { IGolfer } from "./IGolfer";
import { IEvent } from "./IEvent";
import { IPick } from "./IPick";

export interface IGolferResult {
  id: number;
  eventId: number;
  golferId: number;
  position: string;
  posVal: number;
  points: number;
  golfer?: IGolfer;
  event?: IEvent;
  pick?: IPick;
}
