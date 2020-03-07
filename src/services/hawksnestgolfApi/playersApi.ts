import {HttpClient} from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import {IPlayer} from '../../models/IPlayer';
import { ApiDataService } from "./apiDataService";
import { IHawksNestGolfApi } from './IHawksNestGolfApi';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';

@autoinject()
export class PlayersApi implements IHawksNestGolfApi {
  private resourceName: string = 'players';
  private api: ApiDataService;

  constructor(api: ApiDataService) {
    this.api = api;
  }

  public async get(params: IQueryParams = {}): Promise<IPlayer[] | ApiError> {
    return this.api.fetch<IPlayer>(this.resourceName, params);
  }

  public async getById(id: string | number): Promise<IPlayer> {
    return this.api.fetchById(this.resourceName, id);
  }

  public async add(player: IPlayer) {
    return this.api.post(this.resourceName, player);
  }

}
