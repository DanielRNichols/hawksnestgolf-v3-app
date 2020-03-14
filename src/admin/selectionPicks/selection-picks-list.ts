import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from "aurelia-router";
import { ItemsList } from '../../services/itemsListService';
import { SelectionPicksApi } from '../../services/hawksnestgolfApi/selectionPicksApi';
import { SortOrderServices, ISortOrderParams } from 'services/sortOrderServices';
import { NotificationServices } from 'services/notificationServices';
import { ISelectionPick } from 'models/ISelectionPick';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';



@autoinject()
export class SelectionPicksList extends ItemsList {

  // The parent class ItemsList requires Router, NotificationServices and EventAggregator
  constructor(protected api: SelectionPicksApi,
              private sortOrderServices: SortOrderServices) {
    super(api);
    
    this.listParams =
      {
        listHeader: "SelectionPicks",

        sortOrderParams: this.sortOrderServices.get('selectionPicks', "Id", "+"),
        filterParams: { filterString: '', filterOn: 'name', filterOnLabel: 'Name' },
        //pageSize: 25,
        //skip: 0,
      };

    this.toolbar =
      [
        { tooltipTitle: "New SelectionPick", tooltipPlacement: "bottom", onClick: () => this.newItem("selectionPickAdd"), glyph: "fas fa-plus" },
      ];

    this.columns =
      [
        { value: (selectionPick: ISelectionPick) => selectionPick.id, propertyName: "id", header: "Id", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
      ];

    this.actions =
      [
        // { action: (selectionPick) => this.editItem(selectionPick, "selectionPickEdit"), class: "actionButton", tooltip: "Edit SelectionPick", glyph: "fas fa-edit"},
        // { action: (selectionPick) => this.deleteItem(selectionPick), class: "actionButton delete", tooltip: "Delete SelectionPick", glyph: "fas fa-trash" },
      ];
  }

  fetchData = async (params: IQueryParams): Promise<ISelectionPick[] | ApiError> => {
    return this.api.get(params);
  }


}
