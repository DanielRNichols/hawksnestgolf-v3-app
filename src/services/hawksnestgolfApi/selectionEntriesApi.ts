import {HttpClient} from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import {ISelectionEntry} from '../../models/ISelectionEntry';
import { ApiDataService } from "./apiDataService";
import { IHawksNestGolfApi } from './IHawksNestGolfApi';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';

@autoinject()
export class SelectionEntriesApi implements IHawksNestGolfApi {
  private resourceName: string = 'selectionentries';
  private api: ApiDataService;

  constructor(api: ApiDataService) {
    this.api = api;
  }

  public async get(params: IQueryParams = {}): Promise<ISelectionEntry[] | ApiError> {
    return this.api.fetch<ISelectionEntry>(this.resourceName, params);
  }

  public async getById(id: string | number): Promise<ISelectionEntry> {
    return this.api.fetchById(this.resourceName, id);
  }

  public async add(selectionEntry: ISelectionEntry) {
    return this.api.post(this.resourceName, selectionEntry);
  }

}
