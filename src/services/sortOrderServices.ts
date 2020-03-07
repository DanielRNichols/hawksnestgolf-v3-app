import {autoinject} from "aurelia-framework";
import {CacheServices, CacheStore} from "./cacheServices";

function orderby(property: string, direction: string = '+') {
    let factor = direction === '+' ? 1 : -1;
    return function (a: any, b: any) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * factor;
    }
}

export enum SortOrderDirection {
  Ascending,
  Descending
}

export interface ISortOrderParams {
  key: string,
  propertyName: string,
  direction: string
}

@autoinject()
export class SortOrderServices {
    private sortOrderCacheStore: CacheStore;

    constructor(cacheServices: CacheServices) {
        this.sortOrderCacheStore = cacheServices.getStore("sortOrder");
        //console.log(this.sortOrderCacheStore);
    }

    get(key: string, defPropertyName: string, defDir: string): ISortOrderParams {
        //console.log(this.sortOrderCacheStore);
        let sortOrderPropertyName = defPropertyName;
        let sortOrderDirection = defDir;

        let cachedPropertyName = this.sortOrderCacheStore.get(key, "propertyName");
        if(!cachedPropertyName) {
            this.sortOrderCacheStore.put(key, "propertyName", defPropertyName);
            this.sortOrderCacheStore.put(key, "direction", defDir);
        }
        else {
            sortOrderPropertyName = cachedPropertyName;
            let cachedDirection = this.sortOrderCacheStore.get(key, "direction");
            if(!cachedDirection) {
                this.sortOrderCacheStore.put(key, "direction", defDir);
            }
            else
                sortOrderDirection = cachedDirection;
        }


        return {"key": key, "propertyName": sortOrderPropertyName, "direction": sortOrderDirection}
    }

    put(key: string, propertyName: string, dir: string) {
        this.sortOrderCacheStore.put(key, "propertyName", propertyName);
        this.sortOrderCacheStore.put(key, "direction", dir);
        //console.log(this.sortOrderCacheStore);
    }

    toggleSortOrder(key: string, propertyName: string, defaultDir: string) {
        let dir = defaultDir;

        let cachedPropertyName = this.sortOrderCacheStore.get(key, "propertyName");
        if((cachedPropertyName)  && (propertyName == cachedPropertyName)){
            let cachedDirection = this.sortOrderCacheStore.get(key, "direction");
            if(cachedDirection)
                dir = (cachedDirection == '+') ? '-' : '+';
        }

        this.put(key, propertyName, dir);

        return {"key": key, "propertyName" : propertyName, "direction": dir};
    }

    static sortArray(arrayToSort: any, config: ISortOrderParams) {
        if (arrayToSort && config && config.propertyName)
            return (arrayToSort.sort(orderby(config.propertyName, config.direction)));
        else
            return arrayToSort;
    }


}
