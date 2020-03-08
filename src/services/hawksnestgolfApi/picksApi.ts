import { autoinject } from 'aurelia-framework';
import {IPick} from '../../models/IPick';
import { ApiDataService } from "./apiDataService";
import { IHawksNestGolfApi } from './IHawksNestGolfApi';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';

@autoinject()
export class PicksApi implements IHawksNestGolfApi {
  private resourceName: string = 'picks';
  private api: ApiDataService;

  constructor(api: ApiDataService) {
    this.api = api;
  }

  public async get(params: IQueryParams = {}): Promise<IPick[] | ApiError> {
    return this.api.fetch<IPick>(this.resourceName, params);
  }

  public async getById(id: string | number): Promise<IPick> {
    return this.api.fetchById(this.resourceName, id);
  }

  public async add(pick: IPick) {
    return this.api.post(this.resourceName, pick);
  }

}
