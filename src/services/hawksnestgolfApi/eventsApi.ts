import {IEvent} from '../../models/IEvent';
import { ResourceApi } from './resourceApi';

export class EventsApi extends ResourceApi<IEvent> {

  constructor() {
    super('events');
  }
}
