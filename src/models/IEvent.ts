import { ITournament } from "./ITournament";

export enum EventStatus { NotStarted, InProgress, Completed };
export const EventStatusDescriptions: Array<string> = ['Not Started', 'In Progress', 'Completed'];

export interface IEvent {
  id: number;
  eventNo: number;
  year: number;
  entryFee: number;
  status: EventStatus;
  tournamentId: number;
  tournament?: ITournament;
}
