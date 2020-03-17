import { IItem } from '../../models/IItem';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';

export interface IResourceApi {
  resourceDescription: string;
  itemDescription: (item: IItem) => string;
  get: (params: IQueryParams) => Promise<IItem[] | ApiError>;
  getById: (id: string | number) => Promise<IItem | ApiError>;
  add: (item: IItem) => Promise<string | ApiError>;
  update?: (item: IItem) => Promise<IItem | ApiError>;
  delete?: (id: string | number) => Promise<boolean | ApiError>;

}
