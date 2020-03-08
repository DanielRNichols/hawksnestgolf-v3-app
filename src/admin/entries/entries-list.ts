import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from "aurelia-router";
import { ItemsList } from '../../services/itemsListService';
import { EntriesApi } from '../../services/hawksnestgolfApi/entriesApi';
import { SortOrderServices, ISortOrderParams } from 'services/sortOrderServices';
import { NotificationServices } from 'services/notificationServices';
import { IEntry } from 'models/IEntry';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';



@autoinject()
export class EntriesList extends ItemsList {

  // The parent class ItemsList requires Router, NotificationServices and EventAggregator
  constructor(private api: EntriesApi,
              private sortOrderServices: SortOrderServices,
              router: Router,
              notifications: NotificationServices,
              eventAggregator: EventAggregator, ) {
    super(router, notifications, eventAggregator);
    
    this.itemDesc = 'Entry';

    this.listParams =
      {
        listHeader: "Entries",

        sortOrderParams: this.sortOrderServices.get('entries', "Id", "+"),
        filterParams: { filterString: '', filterOn: 'name', filterOnLabel: 'Name' },
        //pageSize: 25,
        //skip: 0,
      };

    this.toolbar =
      [
        { tooltipTitle: "New Entry", tooltipPlacement: "bottom", onClick: () => this.newItem("entryAdd"), glyph: "fas fa-plus" },
      ];

    this.columns =
      [
        { value: (entry: IEntry) => entry.id, propertyName: "id", header: "Id", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (entry: IEntry) => entry.pickNumber, propertyName: "pickNumber", header: "Pick", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (entry: IEntry) => entry.player.name, propertyName: "playerId", header: "Player", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (entry: IEntry) => entry.event.tournament.name, propertyName: "eventId", header: "Tournament", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (entry: IEntry) => entry.event.year, propertyName: "eventId", header: "Year", className: "sortable", sortable: false, defaultSortOrder: '+', alignment: "text-center" },
      ];

    this.actions =
      [
        // { action: (entry) => this.editItem(entry, "entryEdit"), class: "actionButton", tooltip: "Edit Entry", glyph: "glyphicon glyphicon-edit"},
        // { action: (entry) => this.deleteItem(entry), class: "actionButton delete", tooltip: "Delete Entry", glyph: "glyphicon glyphicon-trash" },
      ];
  }

  fetchData = async (params: IQueryParams): Promise<IEntry[] | ApiError> => {
    return this.api.get(params);
  }


}
