import { autoinject } from 'aurelia-framework';
import {IPick} from '../../models/IPick';
import { ApiDataService } from "./apiDataService";
import { IResourceApi } from './IResourceApi';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';

@autoinject()
export class PicksApi implements IResourceApi {
  private resourceName: string = 'picks';

  constructor(private api: ApiDataService) {
  }

  public async get(params: IQueryParams = {}): Promise<IPick[] | ApiError> {
    return this.api.fetch<IPick>(this.resourceName, params);
  }

  public async getById(id: string | number): Promise<IPick | ApiError> {
    return this.api.fetchById<IPick>(this.resourceName, id);
  }

  public async add(pick: IPick) {
    return this.api.post(this.resourceName, pick);
  }
  
  public async update(pick: IPick): Promise<IPick | ApiError> {
    return this.api.put<IPick>(this.resourceName, pick);
  }

  public async delete(id: string | number): Promise<boolean | ApiError> {
    return this.api.delete(this.resourceName, id);
  }

}
