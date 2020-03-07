import {IGolfer} from './IGolfer';

export interface IFieldEntry {
  id: string;
  golferId: string;
  pgaTourId: string;
  odds: string;
  oddsRank: number;

  golfer?: IGolfer;
}
