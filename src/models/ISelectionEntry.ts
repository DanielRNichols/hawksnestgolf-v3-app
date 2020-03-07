import { IPlayer } from "./IPlayer";

export interface ISelectionEntry {
  id: string;
  playerId: string;
  pickNumber: number;
  entryName?: string;

  player?: IPlayer;
}
