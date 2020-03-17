import {IPick} from '../../models/IPick';
import { ResourceApi } from './resourceApi';

export class PicksApi extends ResourceApi<IPick> {

  constructor() {
    super('picks', "Pick");
  }

  itemDescription(pick: IPick) {
    return pick.golfer ? pick.golfer.name : pick.id.toString();
  }
}
