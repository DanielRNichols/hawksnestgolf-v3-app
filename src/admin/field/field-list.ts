import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from "aurelia-router";
import { ItemsList } from '../../services/itemsListService';
import { FieldApi } from '../../services/hawksnestgolfApi/fieldApi';
import { SortOrderServices, ISortOrderParams } from 'services/sortOrderServices';
import { NotificationServices } from 'services/notificationServices';
import { IGolfer } from 'models/IGolfer';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';
import { IFieldEntry } from 'models/IFieldEntry';

@autoinject()
export class GolfersList extends ItemsList {

  // The parent class ItemsList requires Router, NotificationServices and EventAggregator
  constructor(private api: FieldApi,
              private sortOrderServices: SortOrderServices,
              router: Router,
              notifications: NotificationServices,
              eventAggregator: EventAggregator) {
    super(router, notifications, eventAggregator);

    this.itemDesc = "The Field";

    this.listParams =
      {
        listHeader: "The Field",
        sortOrderParams: this.sortOrderServices.get('field', "golfers.worldRanking", "+"),
        filterParams: { filterString: '', filterOn: 'name', filterOnLabel: 'Name' },
        //top: 3,
        //pageSize: 25,
        //skip: 0,
      };

    this.toolbar =
      [
        //{ tooltipTitle: "New Golfer", tooltipPlacement: "bottom", callback: () => this.newItem("golferAdd"), glyph: "fas fa-plus" },
        //{ tooltipTitle: "Update Rankings", tooltipPlacement: "bottom", callback: () => this.updateRankings(), glyph: "fas fa-sync" },
        //    { tooltipTitle: "Settings", tooltipPlacement: "bottom", callback: () => this.settingsButton(), glyph: "glyphicon glyphicon-cog" },
        //    { tooltipTitle: "Print", tooltipPlacement: "bottom", callback: () => this.printButton(), glyph: "glyphicon glyphicon-print" },
        //    { tooltipTitle: "Archives", tooltipPlacement: "bottom", callback: () => this.archivesButton(), glyph: "glyphicon glyphicon-cd" },
        //    { tooltipTitle: "Trash Bin", tooltipPlacement: "bottom", callback: () => this.trashBinButton(), glyph: "glyphicon glyphicon-oil" },
        //    { tooltipTitle: "Help", tooltipPlacement: "bottom", callback: () => this.helpButton(), glyph: "glyphicon glyphicon-question-sign" },

      ];

    this.columns =
      [
        { value: (entry: IFieldEntry) => entry.golfer.id, propertyName: "golfers.id", header: "Id", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (entry: IFieldEntry) => entry.pgaTourId, propertyName: "pgaTourId", header: "PGA Tour Id", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (entry: IFieldEntry) => entry.golfer.name, propertyName: "golfers.name", header: "Name", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (entry: IFieldEntry) => entry.golfer.selectionName, propertyName: "golfers.selectionName", header: "Selection Name", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (entry: IFieldEntry) => entry.golfer.worldRanking, propertyName: "golfers.worldRanking", header: "World Ranking", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (entry: IFieldEntry) => entry.golfer.fedExRanking, propertyName: "golfers.fedExRanking", header: "FedEx Ranking", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (entry: IFieldEntry) => entry.odds, propertyName: "oddsRank", header: "Odds", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (entry: IFieldEntry) => entry.golfer.country, propertyName: "golfers.country", header: "Country", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (entry: IFieldEntry) => entry.golfer.image, propertyName: "golfers.image", header: "Image", sortable: false },
      ];

    this.actions =
      [
        //{ action: (item) => this.editItem(item, "golferEdit"), className: "actionButton", tooltip: "Edit Item", glyph: "glyphicon glyphicon-edit"},
        //{ action: (item) => this.deleteItem(item), className: "actionButton delete", tooltip: "Delete Item", glyph: "glyphicon glyphicon-trash" },
      ];
  }

  fetchData = async (params: IQueryParams): Promise<IGolfer[] | ApiError> => {
    return this.api.get(params);
  }
}
