import { IPick } from "./IPick";

export interface ITeam {
  entryId: number;
  teamNo: number;
  teamName: string;
  pointTotal: number;
  position: number;
  owner: string;
  picks: IPick[];
}
