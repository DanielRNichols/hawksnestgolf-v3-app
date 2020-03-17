import {HttpClient, json} from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { IItem } from '../../models/IItem';
import { IQueryParams, QueryParamsService } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';
import { EventAggregator } from 'aurelia-event-aggregator';


@autoinject()
export class ApiDataService {

  constructor(private httpClient: HttpClient, 
              private queryParamsService: QueryParamsService,
              private eventAggregator: EventAggregator
             ) {
    this.httpClient = httpClient;

    this.httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost/hawksnestgolf-v3-api/')
        .withDefaults({
           credentials: 'same-origin',
           headers: {
             'Accept': 'application/json',
    //        'X-Requested-With': 'Fetch'
           }
        })
        .withInterceptor({
          request(request) {
            //console.log(`Requesting ${request.method} ${request.url}`);
            return request;
          },
          response(response) {
            //console.log(`Received ${response.status} ${response.url}`);
            return response;
          }
        });
          
      }
    );
  }

  async fetchItems<T extends IItem>(resourceName: string, params: IQueryParams = {}): Promise<T[] | ApiError>  {
    const queryString = this.queryParamsService.getQueryString(params);
    const url = `${resourceName}${queryString}`;

    const result = await this.fetch(url);
    if(result instanceof ApiError) {
      return result;
    } else {
      console.log(result as T[]);
      return result as T[];
    }    
    console.log(url);
 }

  async fetchItemById<T extends IItem>(resourceName: string, id: string | number): Promise<T | ApiError>  {
    const url = `${resourceName}/${id}`;

    const result = await this.fetch(url);
    if(result instanceof ApiError) {
      return result;
    } else {
      console.log(result as T);
      return result as T;
    }
  }

  async postItem<T extends IItem>(resourceName: string, item: T): Promise<string | ApiError> {
    const url = resourceName;

    const result = await this.fetch(url, {method: 'POST', body: json(item)});
    if(result instanceof ApiError) {
      return result;
    } else {
      return result.id;
    }
  }
  
  async putItem<T extends IItem>(resourceName: string, item: T): Promise<T | ApiError> {
    const url = `${resourceName}/${item.id}`;

    const result = await this.fetch(url, {method: 'PUT', body: json(item)});
    if(result instanceof ApiError) {
      return result;
    } else {
      console.log(result as T);
      return result as T;
    }
  }  

  async deleteItem(resourceName: string, id: string | number): Promise<boolean | ApiError> {
    const url = `${resourceName}/${id}`;
    const result = await this.fetch(url, {method: 'DELETE'});
    if(result instanceof ApiError) {
      return result;
    } else {
      return result.success;
    }
  }

  async fetch(url: string, options?: RequestInit): Promise<any | ApiError>  {
    console.log(url);
    try {
      this.apiIsRequesting();
      const response = await this.httpClient.fetch(url, options);
      const data = await response.json();
      this.apiIsDone();
      if(response.ok) {
        return data;
      } else {
        return new ApiError(response.status, data.message);
      }
    } catch {
      return new ApiError(500, "Server error");
    }
  }

  // patch currently just used for updating rankings, may need to expand this later
  async patch(resourceName: string): Promise<boolean| ApiError> {
    const url = resourceName;
    const result = await this.fetch(url, {method: 'PATCH'});
    if(result instanceof ApiError) {
      return result;
    } else {
      return true;
    }
  }
    
  async fetchJson(resourceName: string, params: IQueryParams = {}): Promise<any | ApiError>  {
    const queryString = this.queryParamsService.getQueryString(params);
    const url = `${resourceName}${queryString}`;
    console.log(url);

    try {
      const response = await this.httpClient.fetch(url);
      const data = await response.json();
      console.log(data);
      if(response.ok) {
        console.log(data);
        return data;
      } else {
        return new ApiError(response.status, data.message);
      }
    } catch {
      return new ApiError(500, "Server error");
    }
  }

  apiIsRequesting() {
    this.eventAggregator.publish("apiStarted");
    console.log("apiStarted");
  }

  apiIsDone() {
    this.eventAggregator.publish("apiDone");
    console.log("apiDone");
  }

}
