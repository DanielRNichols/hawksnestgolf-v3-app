import { Container } from 'aurelia-framework';
import { ApiDataService } from "./apiDataService";
import { EventAggregator } from 'aurelia-event-aggregator';
import { IResourceApi } from './IResourceApi';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';
import { IItem } from 'models/IItem';

export class ResourceApi<T extends IItem> implements IResourceApi {
  protected api: ApiDataService;
  protected resourceName: string;
  public resourceDescription: string = "";

  constructor(resourceName: string, resourceDescription: string) {
    this.api = Container.instance.get(ApiDataService);
    this.resourceName = resourceName;
    this.resourceDescription = resourceDescription;
  }

  public itemDescription(item: T): string {
    return "";
  }

  public async get(params: IQueryParams = {}): Promise<T[] | ApiError> {
    return this.api.fetchItems<T>(this.resourceName, params);
  }

  public async getById(id: string | number): Promise<T | ApiError> {
    return this.api.fetchItemById<T>(this.resourceName, id);
  }

  public async add(item: T): Promise<string | ApiError> {
    return this.api.postItem<T>(this.resourceName, item);
  }

  public async update(item: T): Promise<T | ApiError> {
    return this.api.putItem<T>(this.resourceName, item);
  }

  public async delete(id: string | number): Promise<boolean | ApiError> {
    return this.api.deleteItem(this.resourceName, id);
  }

}

