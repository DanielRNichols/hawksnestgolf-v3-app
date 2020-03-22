import { Container } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { Router } from "aurelia-router";

import { ISortOrderParams } from './sortOrderServices';
import { NotificationServices } from './notificationServices';
import { IResourceApi } from './hawksnestgolfApi/IResourceApi';
import { IQueryParams } from './queryParamsService';
import { IItem } from '../models/IItem';
import { ApiError } from 'models/ApiError';
import { PromptDialogServices } from './promptDialogServices';

export interface IFilterParams {
  filterString: string;
  filterOn: string;
  filterOnLabel: string;
  useEquals?: boolean;
  hideFilter?: boolean;
}

export interface IItemsListParams {
  listHeader: string;
  sortOrderParams: ISortOrderParams;
  filterParams: IFilterParams;
  additionalParams?: string;
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

export class ItemsList {

  public resourceDesc: string = '';
  public listParams: IItemsListParams;
  public toolbar: IToolbarParams[] = [];
  public columns: IColumnParams[] = [];
  public actions: any = [];
  public items: IItem[] = [];
  private itemsListChangedSubscription: Subscription;

  protected router: Router;
  protected notificationService: NotificationServices;
  protected eventAggregator: EventAggregator;
  protected promptDialogServices: PromptDialogServices;

  constructor(protected api: IResourceApi) { 
    this.router = Container.instance.get(Router);
    this.notificationService = Container.instance.get(NotificationServices);
    this.eventAggregator = Container.instance.get(EventAggregator);
    this.promptDialogServices = Container.instance.get(PromptDialogServices);
    this.api = api;
  }

  async attached() {
    const result = await this.getItems();
    if (result instanceof ApiError) {
      this.notificationService.warning("", "No items found");
      this.items = [];
    } else {
      this.items = result;
      console.log(this.items);
    }
     this.addSubscriptions();
  }

  detached() {
    this.removeSubscriptions();
  }

  async getItems(): Promise<IItem[] | ApiError> {
    let params: IQueryParams = {
      orderby: this.listParams.sortOrderParams,
      filter: `${this.listParams.filterParams.filterString ?
        (this.listParams.filterParams.useEquals ?
          `${this.listParams.filterParams.filterOn}='${this.listParams.filterParams.filterString}'`
          : `${this.listParams.filterParams.filterOn} like '%${this.listParams.filterParams.filterString}%'`
        )
        : ''}`,
      top: this.listParams.top,
      additional: this.listParams.additionalParams
    };
    const result: any = await this.api.get(params);
    //console.log(result);
    return result;
  }

  newItem(addRoute: string) {
    console.log(`New ${this.resourceDesc}`);
    this.router.navigateToRoute(addRoute, {id: 0});
  }

  editItem(item: IItem, editRoute: string) {
    console.log(`Edit ${this.resourceDesc}`);
    this.router.navigateToRoute(editRoute, { id: item.id });
  }

  // deleteItem(item: IItem, deleteRoute: string) {
  //   console.log(`Delete ${this.itemDesc}`);
  //   this.router.navigateToRoute(deleteRoute, { id: item.id });
  // }


  async deleteItem(item: IItem) {
    const title = `Delete ${this.resourceDesc}`;
    const itemDesc = this.api.itemDescription(item);
    const verified = await this.promptDialogServices.YesNo(`${title}: ${itemDesc}?`);
    if(verified) {
      const result = await this.api.delete(item.id);
      // remove it from the items list to update the display
      this.removeItem(item.id);
      console.log(`Deleted: ${result}`);
      if(result instanceof ApiError) {
        this.notificationService.error(title, `Error deleting ${itemDesc}</br>${result.status.toString()}:  ${result.message}`);
       } else {
        this.notificationService.info(title, `Deleted ${itemDesc}`);
      }
    } else {
      this.notificationService.info(title, "Canceled");

    }
  }

  removeItem(id) {
      let len = this.items.length;
      let foundIndex = -1;
      for (let i = 0; i < len && foundIndex == -1; i++) {
          if (this.items[i].id == id) {
              foundIndex = i;
          }
      }
      if (foundIndex >= 0) {
          this.items.splice(foundIndex, 1);
      }

  }

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
