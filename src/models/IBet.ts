
export interface IBet {
  id: number;
  name: string;
  defAmount: number;
}

export interface IDbBet extends IBet {
  resourceName: string;
}
