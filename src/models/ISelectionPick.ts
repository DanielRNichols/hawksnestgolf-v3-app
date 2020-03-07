import { IGolfer } from "./IGolfer";

export interface ISelectionPick {
  id: string;
  entryId: string;
  round: number;
  golferId: string;
  selectionName: string;

  golfer?: IGolfer;

}
