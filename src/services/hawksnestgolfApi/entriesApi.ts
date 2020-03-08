import { autoinject } from 'aurelia-framework';
import {IEntry} from '../../models/IEntry';
import { ApiDataService } from "./apiDataService";
import { IHawksNestGolfApi } from './IHawksNestGolfApi';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';

@autoinject()
export class EntriesApi implements IHawksNestGolfApi {
  private resourceName: string = 'entries';
  private api: ApiDataService;

  constructor(api: ApiDataService) {
    this.api = api;
  }

  public async get(params: IQueryParams = {}): Promise<IEntry[] | ApiError> {
    return this.api.fetch<IEntry>(this.resourceName, params);
  }

  public async getById(id: string | number): Promise<IEntry> {
    return this.api.fetchById(this.resourceName, id);
  }

  public async add(entry: IEntry) {
    return this.api.post(this.resourceName, entry);
  }

}
