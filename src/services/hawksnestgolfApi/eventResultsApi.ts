import {IEventResult} from '../../models/IEventResult';
import { ResourceApi } from './resourceApi';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';

export class EventResultsApi extends ResourceApi<IEventResult> {

  constructor() {
    super('results', "Results");
  }

  itemDescription(eventResult: IEventResult) {
    return eventResult.bet ? eventResult.bet.name : eventResult.id.toString();
  }

  async getByEventId(eventId: number): Promise<IEventResult[] | ApiError> {
    return this.get({filter: `eventid=${eventId}`})
  }

}
