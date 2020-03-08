import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from "aurelia-router";
import { ItemsList } from '../../services/itemsListService';
import { BetsApi } from '../../services/hawksnestgolfApi/betsApi';
import { SortOrderServices, ISortOrderParams } from 'services/sortOrderServices';
import { NotificationServices } from 'services/notificationServices';
import { IBet } from 'models/IBet';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';



@autoinject()
export class BetsList extends ItemsList {

  // The parent class ItemsList requires Router, NotificationServices and EventAggregator
  constructor(private api: BetsApi,
              private sortOrderServices: SortOrderServices,
              router: Router,
              notifications: NotificationServices,
              eventAggregator: EventAggregator, ) {
    super(router, notifications, eventAggregator);
    
    this.itemDesc = 'Bet';

    this.listParams =
      {
        listHeader: "Bets",

        sortOrderParams: this.sortOrderServices.get('bets', "Id", "+"),
        filterParams: { filterString: '', filterOn: 'name', filterOnLabel: 'Name' },
        //pageSize: 25,
        //skip: 0,
      };

    this.toolbar =
      [
        { tooltipTitle: "New Bet", tooltipPlacement: "bottom", onClick: () => this.newItem("betAdd"), glyph: "fas fa-plus" },
      ];

    this.columns =
      [
        { value: (bet: IBet) => bet.id, propertyName: "id", header: "Id", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (bet: IBet) => bet.name, propertyName: "name", header: "Name", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (bet: IBet) => bet.defAmount, propertyName: "defAmount", header: "Amount", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-right" },
      ];

    this.actions =
      [
        // { action: (bet) => this.editItem(bet, "betEdit"), class: "actionButton", tooltip: "Edit Bet", glyph: "glyphicon glyphicon-edit"},
        // { action: (bet) => this.deleteItem(bet), class: "actionButton delete", tooltip: "Delete Bet", glyph: "glyphicon glyphicon-trash" },
      ];
  }

  fetchData = async (params: IQueryParams): Promise<IBet[] | ApiError> => {
    return this.api.get(params);
  }


}
