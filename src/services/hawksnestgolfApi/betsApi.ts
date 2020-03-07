import {HttpClient} from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import {IBet} from '../../models/IBet';
import { ApiDataService } from "./apiDataService";
import { IHawksNestGolfApi } from './IHawksNestGolfApi';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';

@autoinject()
export class BetsApi implements IHawksNestGolfApi {
  private resourceName: string = 'bets';
  private api: ApiDataService;

  constructor(api: ApiDataService) {
    this.api = api;
  }

  public async get(params: IQueryParams = {}): Promise<IBet[] | ApiError> {
    return this.api.fetch<IBet>(this.resourceName, params);
  }

  public async getById(id: string | number): Promise<IBet> {
    return this.api.fetchById(this.resourceName, id);
  }

  public async add(bet: IBet) {
    return this.api.post(this.resourceName, bet);
  }

}
