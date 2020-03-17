import { IBet } from "./IBet";
import { IEntry } from "./IEntry";

export interface IEventResult {
  id: number;
  betId: number;
  entryId: number;
  amount: number;
  bet?: IBet;
  entry?: IEntry;
}
