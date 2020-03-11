import {IEvent} from '../../models/IEvent';
import { ResourceApi } from './hawksnestgolfApi';

export class EventsApi extends ResourceApi<IEvent> {

  constructor() {
    super('events');
  }
}
