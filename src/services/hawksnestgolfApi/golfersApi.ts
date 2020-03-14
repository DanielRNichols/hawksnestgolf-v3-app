import {IGolfer} from '../../models/IGolfer';
import { ResourceApi } from './resourceApi';

export class GolfersApi extends ResourceApi<IGolfer> {

  constructor() {
    super('golfers', "Golfer");
  }

  updateRankings() {
    return this.api.patch('golfers/rankings');
  }

}
