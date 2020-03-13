import { autoinject } from 'aurelia-framework';
import {ISelectionEntry} from '../../models/ISelectionEntry';
import { ApiDataService } from "./apiDataService";
import { IResourceApi } from './IResourceApi';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';

@autoinject()
export class SelectionEntriesApi implements IResourceApi {
  private resourceName: string = 'selectionentries';
  private api: ApiDataService;

  constructor(api: ApiDataService) {
    this.api = api;
  }

  public async get(params: IQueryParams = {}): Promise<ISelectionEntry[] | ApiError> {
    return this.api.fetch<ISelectionEntry>(this.resourceName, params);
  }

  public async getById(id: string | number): Promise<ISelectionEntry | ApiError> {
    return this.api.fetchById<ISelectionEntry>(this.resourceName, id);
  }

  public async add(selectionEntry: ISelectionEntry) {
    return this.api.post(this.resourceName, selectionEntry);
  }

}
