
import { autoinject, Container } from 'aurelia-framework';
import {IEventDetails} from '../../models/IEventDetails';
import { ApiDataService } from './apiDataService';
import { ApiError } from 'models/ApiError';

@autoinject
export class EventDetailsApi {
  protected api: ApiDataService;
  private resourceName = 'eventDetails';

  constructor() { //private queryParamsService: QueryParamsService) {
    this.api = Container.instance.get(ApiDataService);
  }

  public async get(id: number): Promise<IEventDetails | ApiError> {
    const queryString = "?includeEvents=0"; //this.queryParamsService.getQueryString(params);
    const url = `${this.resourceName}/${id}${queryString}`;

    const result = await this.api.fetch(url);
    if(result instanceof ApiError) {
      return result;
    } else {
      console.log(result as IEventDetails);
      return result as IEventDetails;
    }
  }    
}
