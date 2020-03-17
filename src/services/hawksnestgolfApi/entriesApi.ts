import {IEntry} from '../../models/IEntry';
import { ResourceApi } from './resourceApi';

export class EntriesApi extends ResourceApi<IEntry> {

  constructor() {
    super('entries', "Entry");
  }

  itemDescription(entry: IEntry) {return entry.id.toString()}
}
