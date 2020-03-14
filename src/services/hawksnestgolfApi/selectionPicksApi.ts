import { autoinject } from 'aurelia-framework';
import {ISelectionPick} from '../../models/ISelectionPick';
import { ApiDataService } from "./apiDataService";
import { IResourceApi } from './IResourceApi';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';

@autoinject()
export class SelectionPicksApi implements IResourceApi {
  private resourceName: string = 'selectionpicks';
  public resourceDescription = "Selection Pick";
  private api: ApiDataService;

  constructor(api: ApiDataService) {
    this.api = api;
  }

  public async get(params: IQueryParams = {}): Promise<ISelectionPick[] | ApiError> {
    return this.api.fetch<ISelectionPick>(this.resourceName, params);
  }

  public async getById(id: string | number): Promise<ISelectionPick | ApiError> {
    return this.api.fetchById<ISelectionPick>(this.resourceName, id);
  }

  public async add(selectionPick: ISelectionPick) {
    return this.api.post(this.resourceName, selectionPick);
  }

}
