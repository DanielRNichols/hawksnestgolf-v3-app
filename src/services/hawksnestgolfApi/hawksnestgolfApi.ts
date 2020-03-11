import { Container } from 'aurelia-framework';
import { ApiDataService } from "./apiDataService";
import { IHawksNestGolfApi } from './IHawksNestGolfApi';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';
import { IItem } from 'models/IItem';

export class ResourceApi<T extends IItem> implements IHawksNestGolfApi {
  protected api: ApiDataService;
  private resourceName: string;

  constructor(resourceName: string) {
    this.api = Container.instance.get(ApiDataService);
    this.resourceName = resourceName;
  }

  public async get(params: IQueryParams = {}): Promise<T[] | ApiError> {
    return this.api.fetch<T>(this.resourceName, params);
  }

  public async getById(id: string | number): Promise<T | ApiError> {
    return this.api.fetchById<T>(this.resourceName, id);
  }

  public async add(item: T): Promise<string | ApiError> {
    return this.api.post<T>(this.resourceName, item);
  }

  public async update(item: T): Promise<T | ApiError> {
    return this.api.put<T>(this.resourceName, item);
  }

  public async delete(id: string | number): Promise<boolean | ApiError> {
    return this.api.delete(this.resourceName, id);
  }

}

