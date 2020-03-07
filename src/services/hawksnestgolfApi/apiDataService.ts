import {HttpClient, json} from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { IItem } from '../../models/IItem';
import { IQueryParams, QueryParamsService } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';


@autoinject()
export class ApiDataService {
  resourceName: string;

  constructor(private httpClient: HttpClient, 
              private queryParamsService: QueryParamsService
             ) {
    this.httpClient = httpClient;

    this.httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost/hawksnestgolf-v3-api/')
        .withDefaults({
    //       credentials: 'same-origin',
           headers: {
             'Accept': 'application/json',
    //         //'X-Requested-With': 'Fetch'
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

  async fetch<T>(resourceName: string, params: IQueryParams = {}): Promise<T[] | ApiError>  {
    const queryString = this.queryParamsService.getQueryString(params);
    const url = `${resourceName}${queryString}`;
    console.log(url);

    try {
      const response = await this.httpClient.fetch(url);
      const data = await response.json();
      console.log(data);
      if(response.ok) {
        console.log(data);
        return data as T[];
      } else {
        return new ApiError(response.status, data.message);
      }
      return await response.json();
    } catch {
      return new ApiError(500, "Server error");
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
      return await response.json();
    } catch {
      return new ApiError(500, "Server error");
    }
  }

  async fetchById(resourceName: string, id: string | number): Promise<any | null>  {
    const url = `${resourceName}/${id}`;
    console.log(url);
    try {
      const response = await this.httpClient.fetch(url);
      return await response.json();
    } catch {
      return null;
    }
  }

  async post(resourceName: string, item: IItem): Promise<any | null> {
    const url = this.resourceName;
    console.log(url);
    try {
      const response = await this.httpClient.fetch(url, {method: 'post', body: json(item)});
      return await response.json();
    } catch {
      return null;
    }
  }
  
}
