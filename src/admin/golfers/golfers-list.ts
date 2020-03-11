import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from "aurelia-router";
import { ItemsList } from '../../services/itemsListService';
import { GolfersApi } from '../../services/hawksnestgolfApi/golfersApi';
import { SortOrderServices, ISortOrderParams } from 'services/sortOrderServices';
import { NotificationServices } from 'services/notificationServices';
import { IGolfer } from 'models/IGolfer';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';

@autoinject()
export class GolfersList extends ItemsList {

  // The parent class ItemsList requires Router, NotificationServices and EventAggregator
  constructor(private api: GolfersApi,
              private sortOrderServices: SortOrderServices,
              router: Router,
              notifications: NotificationServices,
              eventAggregator: EventAggregator) {
    super(router, notifications, eventAggregator);

    this.itemDesc = "Golfer";

    this.listParams =
      {
        listHeader: "Golfers",
        sortOrderParams: this.sortOrderServices.get('golfers', "worldRanking", "+"),
        filterParams: { filterString: '', filterOn: 'name', filterOnLabel: 'Name' },
        //top: 3,
        //pageSize: 25,
        //skip: 0,
      };

    this.toolbar =
      [
        { tooltipTitle: "New Golfer", tooltipPlacement: "bottom", onClick: () => this.newItem("golferAdd"), glyph: "fas fa-plus", label: "Add Golfer" },
        { tooltipTitle: "Update Rankings", tooltipPlacement: "bottom", onClick: () => this.updateRankings(), glyph: "fas fa-sync" , label: "Update Rankings"},

      ];

    this.columns =
      [
        { value: (golfer: IGolfer) => golfer.id, propertyName: "id", header: "Id", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (golfer: IGolfer) => golfer.pgaTourId, propertyName: "pgaTourId", header: "PGA Tour Id", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (golfer: IGolfer) => golfer.name, propertyName: "name", header: "Name", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (golfer: IGolfer) => golfer.selectionName, propertyName: "selectionName", header: "Selection Name", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (golfer: IGolfer) => golfer.worldRanking, propertyName: "worldRanking", header: "World Ranking", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (golfer: IGolfer) => golfer.fedExRanking, propertyName: "fedExRanking", header: "FedEx Ranking", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (golfer: IGolfer) => golfer.country, propertyName: "country", header: "Country", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (golfer: IGolfer) => golfer.image, propertyName: "image", header: "Image", sortable: false },
      ];

    this.actions =
      [
        { action: (item: IGolfer) => this.editItem(item, "golferEdit"), className: "actionButton", tooltip: "Edit Item", glyph: "fas fa-edit"},
        { action: (item: IGolfer) => this.deleteItem(item, "golferDelete"), className: "actionButton delete", tooltip: "Delete Item", glyph: "fas fa-trash" },
      ];
  }

  fetchData = async (params: IQueryParams): Promise<IGolfer[] | ApiError> => {
    return this.api.get(params);
  }

  updateRankings() {
    console.log("Update World and FedEx rankings");
    this.api.updateRankings();
  }

}
