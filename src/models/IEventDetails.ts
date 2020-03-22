import { IEvent } from "./IEvent";
import { ITeam } from "./ITeam";
import { IGolferResult } from "./IGolferResult";

export interface IEventDetails {
  events: IEvent[];
  event: IEvent;
  teams: ITeam[];
  leaderboard: IGolferResult[];
  
}
