import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from "aurelia-router";
import { ItemsList } from '../../services/itemsListService';
import { PicksApi } from '../../services/hawksnestgolfApi/picksApi';
import { SortOrderServices, ISortOrderParams } from 'services/sortOrderServices';
import { NotificationServices } from 'services/notificationServices';
import { IPick } from 'models/IPick';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';



@autoinject()
export class PicksList extends ItemsList {

  // The parent class ItemsList requires Router, NotificationServices and EventAggregator
  constructor(protected api: PicksApi,
              private sortOrderServices: SortOrderServices) {
    super(api);
    
    this.listParams =
      {
        listHeader: "Picks",

        sortOrderParams: this.sortOrderServices.get('picks', "Id", "+"),
        filterParams: { filterString: '', filterOn: 'name', filterOnLabel: 'Name' },
        //top: 50,
        //pageSize: 25,
        //skip: 0,
      };

    this.toolbar =
      [
        { tooltipTitle: "New Pick", tooltipPlacement: "bottom", onClick: () => this.newItem("pickAdd"), glyph: "fas fa-plus" },

      ];

    this.columns =
      [
        { value: (pick: IPick) => pick.id, propertyName: "id", header: "Id", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (pick: IPick) => pick.entry.event.year, propertyName: "eventId", header: "Year", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (pick: IPick) => pick.entry.event.tournament.name, propertyName: "eventId", header: "Tournament", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (pick: IPick) => pick.round, propertyName: "round", header: "Round", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (pick: IPick) => pick.entry.player.name, propertyName: "entryId", header: "Player", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (pick: IPick) => pick.golfer.name, propertyName: "entryId", header: "Golfer", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
      ];

    this.actions =
      [
        // { action: (pick) => this.editItem(pick, "pickEdit"), class: "actionButton", tooltip: "Edit Pick", glyph: "fas fa-edit"},
        // { action: (pick) => this.deleteItem(pick), class: "actionButton delete", tooltip: "Delete Pick", glyph: "fas fa-trash" },
      ];
  }

  fetchData = async (params: IQueryParams): Promise<IPick[] | ApiError> => {
    return this.api.get(params);
  }


}
