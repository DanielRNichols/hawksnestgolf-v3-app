import { autoinject } from 'aurelia-framework';
import {IGolfer} from '../../models/IGolfer';
import { ApiDataService } from "./apiDataService";
import { IHawksNestGolfApi } from './IHawksNestGolfApi';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';

@autoinject()
export class GolfersApi implements IHawksNestGolfApi {
  private resourceName: string = 'golfers';
  private api: ApiDataService;

  constructor(api: ApiDataService) {
    this.api = api;
  }

  public async get(params: IQueryParams = {}): Promise<IGolfer[] | ApiError> {
    return this.api.fetch<IGolfer>(this.resourceName, params);
  }

  public async getById(id: string | number): Promise<IGolfer | ApiError> {
    return this.api.fetchById<IGolfer>(this.resourceName, id);
  }

  public async add(golfer: IGolfer) {
    return this.api.post(this.resourceName, golfer);
  }

}
