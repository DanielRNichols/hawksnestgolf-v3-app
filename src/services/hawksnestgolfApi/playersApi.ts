import {IPlayer} from '../../models/IPlayer';
import { ResourceApi } from './hawksnestgolfApi';

export class PlayersApi extends ResourceApi<IPlayer> {
  constructor() {
    super('players');
  }
}
