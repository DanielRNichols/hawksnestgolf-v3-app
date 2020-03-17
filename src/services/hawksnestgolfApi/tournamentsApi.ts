import {ITournament} from '../../models/ITournament';
import { ResourceApi } from './resourceApi';
import { ApiError } from 'models/ApiError';

export class TournamentsApi extends ResourceApi<ITournament> {

  constructor() {
    super('tournaments', "Tournament");
  }
  
  itemDescription(tournament: ITournament) {return tournament.name}

  async getMaxOrdinal(): Promise<number | ApiError> {
    const url = `${this.resourceName}/utils/max/ordinal`;

    const result = await this.api.fetch(url);
    if(result instanceof ApiError) {
      return result;
    } else {
      return result.max;
    }
  }

}
