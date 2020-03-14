import {IPlayer} from '../../models/IPlayer';
import { ResourceApi } from './resourceApi';

export class PlayersApi extends ResourceApi<IPlayer> {
  constructor() {
    super('players', "Player");
  }
}
