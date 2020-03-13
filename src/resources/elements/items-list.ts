import { autoinject, bindable, bindingMode } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { SortOrderServices } from "../../services/sortOrderServices";
import { IItemsListParams } from '../../services/itemsListService';

@autoinject()
export class ItemsList {
    @bindable items;
    @bindable columns;
    @bindable listParams: IItemsListParams;
    @bindable toolbar;
    @bindable actions;

    private sortOrderServices: SortOrderServices;
    private eventAggregator: EventAggregator;
    private pageSize: number = 25;

    rowNum = 0;

    constructor(sortOrderServices: SortOrderServices, 
                eventAggregator: EventAggregator) {
        this.sortOrderServices = sortOrderServices;
        this.eventAggregator = eventAggregator;

    }

    itemsChanged(newValue: any) {
        this.items = newValue;
    }

    filterChanged(newValue: string) {
        this.listParams.filterParams.filterString = newValue;
        this.publishItemsListChangedEvent();
    }

    // pageSizeChanged() {
    //     this.listParams.pageSize = this.pageSize;
    //     this.publishItemsListChangedEvent();
    // }

    // prevPage() {
    //     this.listParams.skip = Math.max(0, parseInt(this.listParams.skip) - parseInt(this.listParams.pageSize));
    //     this.publishItemsListChangedEvent();
    // }

    // nextPage() {
    //     this.listParams.skip = parseInt(this.listParams.pageSize) + parseInt(this.listParams.skip);
    //     this.publishItemsListChangedEvent();
    // }

    setSortOrder(propertyName: string, defaultDir: string) {
        this.listParams.sortOrderParams = this.sortOrderServices.toggleSortOrder(this.listParams.sortOrderParams.key, propertyName, defaultDir);
        console.log(this.listParams.sortOrderParams);
        this.publishItemsListChangedEvent();
    }

    publishItemsListChangedEvent() {
        console.log("Publishing Items List Changed Event");
        this.eventAggregator.publish("ItemsListChanged", this.listParams);
    }


}
