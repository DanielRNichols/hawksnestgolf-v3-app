import { ISortOrderParams } from "./sortOrderServices";

export interface IQueryParams {
  filter?: string;
  orderby?: string | ISortOrderParams;
  top?: number;
  skip?: number;
  additional?: string;
}

function getOrderByString(sortOrderConfig: ISortOrderParams): string {
  const dir = (sortOrderConfig.direction == '-') ? ' desc' : '';
  return `${sortOrderConfig.propertyName}${dir}`;
}

export class QueryParamsService {

  getQueryString(params: IQueryParams): string {

    let queryString = "";
    if (!params)
        return queryString;

    if (params.filter) {
        queryString += `${!queryString ? "?" : "&"}filter=${params.filter}`;
    }

    if (params.orderby) {
      let orderbyString: string;

      if(typeof params.orderby === 'string')
        orderbyString = params.orderby;
      else 
        orderbyString = getOrderByString(params.orderby);

      queryString += `${!queryString ? "?" : "&"}orderby=${orderbyString}`;
    }

    if (params.top) {
        queryString += `${!queryString ? "?" : "&"}top=${params.top}`;
    }

    if (params.skip) {
        queryString += `${!queryString ? "?" : "&"}skip=${params.skip}`;
    }

    if (params.additional) {
        queryString += `${!queryString ? "?" : "&"}${params.additional}`;
    }

    return queryString;
  }
}

