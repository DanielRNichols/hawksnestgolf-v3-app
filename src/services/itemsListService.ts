import { autoinject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { Router } from "aurelia-router";

import { ISortOrderParams } from './sortOrderServices';
import { NotificationServices } from './notificationServices';
import { IResourceApi } from './hawksnestgolfApi/IResourceApi';
import { IQueryParams } from './queryParamsService';
import { IItem } from '../models/IItem';
import { ApiError } from 'models/ApiError';

export interface IFilterParams {
  filterString: string;
  filterOn: string;
  filterOnLabel: string
}

export interface IItemsListParams {
  listHeader: string;
  sortOrderParams: ISortOrderParams;
  filterParams: IFilterParams;
  top?: number
  //pageSize: 25;
  //skip: 0;

}

export interface IToolbarParams {
  tooltipTitle: string;
  tooltipPlacement: string;
  onClick: () => void;
  glyph: string;
  label?: string;
}

export interface IColumnParams {
  value: (item: IItem) => any;
  propertyName: string;
  header: string;
  className?: string;
  sortable?: boolean;
  defaultSortOrder?: string;
  alignment?: string

}

export interface IActionParams {
  action: (item: IItem) => void;
  className: string;
  tooltip: string;
  glyph: string
}

export abstract class ItemsList {

  public itemDesc: string = '';
  public listParams: IItemsListParams;
  public toolbar: IToolbarParams[] = [];
  public columns: IColumnParams[] = [];
  public actions: any = [];
  public items: IItem[] = [];
  private itemsListChangedSubscription: Subscription;

  constructor(protected router: Router,
              protected notification: NotificationServices,
              protected eventAggregator: EventAggregator) { 
  }

  abstract async fetchData(params: IQueryParams): Promise<IItem[] | ApiError>;

  async bind() {
    const result = await this.getItems();
    if (result instanceof ApiError) {

    } else {
      this.items = result;
    }
  }

  attached() {
    this.addSubscriptions();
  }

  detached() {
    this.removeSubscriptions();
  }

  async getItems(): Promise<IItem[] | ApiError> {
    let params: IQueryParams = {
      orderby: this.listParams.sortOrderParams,
      filter: `${this.listParams.filterParams.filterString ?
        `${this.listParams.filterParams.filterOn} like '%${this.listParams.filterParams.filterString}%'`
        : ''}`,
      top: this.listParams.top,
    };
    const result: any = await this.fetchData(params);
    console.log(result);
    return result;
  }

  newItem(addRoute: string) {
    console.log(`New ${this.itemDesc}`);
    this.router.navigateToRoute(addRoute);
  }

  editItem(item: IItem, editRoute: string) {
    console.log(`Edit ${this.itemDesc}`);
    this.router.navigateToRoute(editRoute, { id: item.id });
  }

  deleteItem(item: IItem, deleteRoute: string) {
    console.log(`Delete ${this.itemDesc}`);
    this.router.navigateToRoute(deleteRoute, { id: item.id });
  }

  // removeItem(id) {
  //     let len = this.items.length;
  //     let foundIndex = -1;
  //     for (let i = 0; i < len, foundIndex == -1; i++) {
  //         if (this.items[i].id == id) {
  //             foundIndex = i;
  //         }
  //     }
  //     if (foundIndex >= 0) {
  //         this.items.splice(foundIndex, 1);
  //     }

  // }

  addSubscriptions() {
    // subscribe to ItemsListChanged event
    this.itemsListChangedSubscription = this.eventAggregator.subscribe("ItemsListChanged",
      async (listParams: IItemsListParams) => {
        console.log("Responding to ItemsListChanged Event");

        this.listParams = listParams;
        console.log(this.listParams);
        const result = await this.getItems();
        if (result instanceof ApiError) {

        } else {
          this.items = result;
        }
      });
  }

  removeSubscriptions() {
    if (this.itemsListChangedSubscription) {
      this.itemsListChangedSubscription.dispose();
    }
  }

}
