import {IYear} from '../../models/IYear';
import { ResourceApi } from './resourceApi';

export class YearsApi extends ResourceApi<IYear> {
  constructor() {
    super('years', "Year");
  }

  itemDescription(year: IYear) { return year.year.toString();}
}
