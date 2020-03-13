import {ITournament} from '../../models/ITournament';
import { ResourceApi } from './resourceApi';

export class TournamentsApi extends ResourceApi<ITournament> {

  constructor() {
    super('tournaments');
  }
}
