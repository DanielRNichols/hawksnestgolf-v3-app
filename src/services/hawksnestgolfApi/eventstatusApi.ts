import {IEventStatus} from '../../models/IEventStatus';
import { ResourceApi } from './resourceApi';

export class EventStatusApi extends ResourceApi<IEventStatus> {
  constructor() {
    super('eventstatus', "Event Status");
  }
}
