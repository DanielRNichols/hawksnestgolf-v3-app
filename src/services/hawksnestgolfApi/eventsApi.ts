import {IEvent} from '../../models/IEvent';
import { ResourceApi } from './resourceApi';
import { ApiError } from 'models/ApiError';

export class EventsApi extends ResourceApi<IEvent> {

  constructor() {
    super('events', "Event");
  }

  itemDescription(event: IEvent) {
    return `${event.year} ${event.tournament ? event.tournament.name : event.tournamentId.toString()}`;
  }

  async getMaxEventNo(): Promise<number | ApiError> {
    const url = `${this.resourceName}/utils/max/eventno`;

    const result = await this.api.fetch(url);
    if(result instanceof ApiError) {
      return result;
    } else {
      return result.max;
    }
  }

}
