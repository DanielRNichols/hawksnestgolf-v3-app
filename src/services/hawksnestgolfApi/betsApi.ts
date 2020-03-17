import {IBet} from '../../models/IBet';
import { ResourceApi } from './resourceApi';

export class BetsApi extends ResourceApi<IBet> {

  constructor() {
    super('bets', "Bet");
  }

  itemDescription(bet: IBet) {return bet.name}
}
