import {IFieldEntry} from '../../models/IFieldEntry';
import { ResourceApi } from './resourceApi';

export class FieldApi extends ResourceApi<IFieldEntry> {

  constructor() {
    super('field', "Field Entry");
  }

  itemDescription(fieldEntry: IFieldEntry) {
    return fieldEntry.golfer ? fieldEntry.golfer.name : fieldEntry.id.toString();
  }

  deleteAll() {
    return this.api.deleteItem('fields', 'all');
  }
}
