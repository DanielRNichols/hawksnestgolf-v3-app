import {IEventStatus} from '../../models/IEventStatus';
import { ResourceApi } from './hawksnestgolfApi';

export class EventStatusApi extends ResourceApi<IEventStatus> {
  constructor() {
    super('eventstatus');
  }
}
