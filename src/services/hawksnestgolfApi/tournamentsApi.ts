import {ITournament} from '../../models/ITournament';
import { ResourceApi } from './hawksnestgolfApi';

export class TournamentsApi extends ResourceApi<ITournament> {

  constructor() {
    super('tournaments');
  }
}
