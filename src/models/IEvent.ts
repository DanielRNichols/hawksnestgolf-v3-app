import { ITournament } from "./ITournament";
import { IEventStatus } from "./IEventStatus";

export const EventStatusDescriptions: Array<string> = ['Not Started', 'In Progress', 'Completed'];

export interface IEvent {
  id: number;
  eventNo: number;
  year: number;
  entryFee: number;
  status: number;
  tournamentId: number;
  tournament?: ITournament;
  eventStatus?: IEventStatus;
}
