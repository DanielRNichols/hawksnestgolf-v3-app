import {IGolfer} from '../../models/IGolfer';
import { ResourceApi } from './hawksnestgolfApi';

export class GolfersApi extends ResourceApi<IGolfer> {

  constructor() {
    super('golfers');
  }

  updateRankings() {
    return this.api.patch('golfers/rankings');
  }

}
