import { IItem } from '../../models/IItem';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';

export interface IHawksNestGolfApi {
  get: (params: IQueryParams) => Promise<IItem[] | ApiError>;
  getById?: (id: string | number) => Promise<IItem | ApiError>;
  add?: (item: IItem) => Promise<IItem> | ApiError;


}
