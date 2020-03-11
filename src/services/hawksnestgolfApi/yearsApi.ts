import {IYear} from '../../models/IYear';
import { ResourceApi } from './hawksnestgolfApi';

export class YearsApi extends ResourceApi<IYear> {
  constructor() {
    super('years');
  }
}
