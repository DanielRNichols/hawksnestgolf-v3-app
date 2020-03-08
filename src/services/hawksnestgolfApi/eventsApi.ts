import { autoinject } from 'aurelia-framework';
import {IEvent} from '../../models/IEvent';
import { ApiDataService } from "./apiDataService";
import { IHawksNestGolfApi } from './IHawksNestGolfApi';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';

@autoinject()
export class EventsApi implements IHawksNestGolfApi {
  private resourceName: string = 'events';
  private api: ApiDataService;

  constructor(api: ApiDataService) {
    this.api = api;
  }

  public async get(params: IQueryParams = {}): Promise<IEvent[] | ApiError> {
    return this.api.fetch<IEvent>(this.resourceName, params);
  }

  public async getById(id: string | number): Promise<IEvent> {
    return this.api.fetchById(this.resourceName, id);
  }

  public async add(event: IEvent) {
    return this.api.post(this.resourceName, event);
  }

}
