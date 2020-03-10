import {IBet} from '../../models/IBet';
import { ResourceApi } from './hawksnestgolfApi';

export class BetsApi extends ResourceApi<IBet> {

  constructor() {
    super('bets');
  }
}
