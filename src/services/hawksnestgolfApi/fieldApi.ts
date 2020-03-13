import {IFieldEntry} from '../../models/IFieldEntry';
import { ResourceApi } from './resourceApi';

export class FieldApi extends ResourceApi<IFieldEntry> {

  constructor() {
    super('field');
  }

  deleteAll() {
    return this.api.delete('fields', 'all');
  }
}
