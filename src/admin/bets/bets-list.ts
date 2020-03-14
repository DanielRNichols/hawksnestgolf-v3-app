import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from "aurelia-router";
import { ItemsList, IToolbarParams, IItemsListParams, IColumnParams, IActionParams } from '../../services/itemsListService';
import { SortOrderServices, ISortOrderParams } from 'services/sortOrderServices';
import { NotificationServices } from 'services/notificationServices';
import { IBet } from 'models/IBet';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';
import { BetsApi } from 'services/hawksnestgolfApi/betsApi';

@autoinject()
export class BetsList extends ItemsList {

  listParams: IItemsListParams;
  toolbar: IToolbarParams[];
  columns: IColumnParams[];
  actions: IActionParams[];

  // The parent class ItemsList requires Router, NotificationServices, EventAggregator, DialogService
  constructor(protected api: BetsApi,
              private sortOrderServices: SortOrderServices) {
    super(api);
    
    this.resourceDesc = 'Bet';

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
        { tooltipTitle: "New Bet", tooltipPlacement: "bottom", onClick: () => this.newItem("betEdit"), glyph: "fas fa-plus", label: "Add Bet" },
      ];

    this.columns =
      [
        { value: (bet: IBet) => bet.id, propertyName: "id", header: "Id", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (bet: IBet) => bet.name, propertyName: "name", header: "Name", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (bet: IBet) => bet.defAmount, propertyName: "defAmount", header: "Amount", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-right" },
      ];

    this.actions =
      [
        { action: (bet: IBet) => this.editItem(bet, "betEdit"), className: "actionButton", tooltip: "Edit Bet", glyph: "fas fa-edit"},
        { action: (bet: IBet) => this.deleteItem(bet, bet.name), className: "actionButton delete", tooltip: "Delete Bet", glyph: "fas fa-trash" },
      ];
  }
}
