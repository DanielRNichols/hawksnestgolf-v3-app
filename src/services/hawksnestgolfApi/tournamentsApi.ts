import {HttpClient} from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import {ITournament} from '../../models/ITournament';
import { ApiDataService } from "./apiDataService";
import { IHawksNestGolfApi } from './IHawksNestGolfApi';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';

@autoinject()
export class TournamentsApi implements IHawksNestGolfApi {
  private resourceName: string = 'tournaments';
  private api: ApiDataService;

  constructor(api: ApiDataService) {
    this.api = api;
  }

  public async get(params: IQueryParams = {}): Promise<ITournament[] | ApiError> {
    return this.api.fetch<ITournament>(this.resourceName, params);
  }

  public async getById(id: string | number): Promise<ITournament> {
    return this.api.fetchById(this.resourceName, id);
  }

  public async add(tournament: ITournament) {
    return this.api.post(this.resourceName, tournament);
  }

}
