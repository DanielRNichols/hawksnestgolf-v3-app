import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from "aurelia-router";
import { ItemsList } from '../../services/itemsListService';
import { SelectionEntriesApi } from '../../services/hawksnestgolfApi/selectionEntriesApi';
import { SortOrderServices, ISortOrderParams } from 'services/sortOrderServices';
import { NotificationServices } from 'services/notificationServices';
import { ISelectionEntry } from 'models/ISelectionEntry';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';



@autoinject()
export class SelectionEntriesList extends ItemsList {

  // The parent class ItemsList requires Router, NotificationServices and EventAggregator
  constructor(protected api: SelectionEntriesApi,
              private sortOrderServices: SortOrderServices) {
    super(api);
    
    this.listParams =
      {
        listHeader: "SelectionEntries",

        sortOrderParams: this.sortOrderServices.get('selectionEntries', "Id", "+"),
        filterParams: { filterString: '', filterOn: 'name', filterOnLabel: 'Name' },
        //pageSize: 25,
        //skip: 0,
      };

    this.toolbar =
      [
        { tooltipTitle: "New SelectionEntry", tooltipPlacement: "bottom", onClick: () => this.newItem("selectionEntryAdd"), glyph: "fas fa-plus" },
      ];

    this.columns =
      [
        { value: (selectionEntry: ISelectionEntry) => selectionEntry.id, propertyName: "id", header: "Id", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (selectionEntry: ISelectionEntry) => selectionEntry.playerId, propertyName: "playerId", header: "Player Id", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (selectionEntry: ISelectionEntry) => selectionEntry.player.name, propertyName: "players.name", header: "Player", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (selectionEntry: ISelectionEntry) => selectionEntry.pickNumber, propertyName: "pickNumber", header: "Pick Number", className: "sortable", sortable: true, defaultSortOrder: '+' },
  ];

    this.actions =
      [
        // { action: (selectionEntry) => this.editItem(selectionEntry, "selectionEntryEdit"), class: "actionButton", tooltip: "Edit SelectionEntry", glyph: "fas fa-edit"},
        // { action: (selectionEntry) => this.deleteItem(selectionEntry), class: "actionButton delete", tooltip: "Delete SelectionEntry", glyph: "fas fa-trash" },
      ];
  }

  fetchData = async (params: IQueryParams): Promise<ISelectionEntry[] | ApiError> => {
    return this.api.get(params);
  }


}
