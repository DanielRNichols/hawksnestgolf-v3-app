import { autoinject } from 'aurelia-framework';
import { ItemsList } from '../../services/itemsListService';
import { GolfersApi } from '../../services/hawksnestgolfApi/golfersApi';
import { SortOrderServices, ISortOrderParams } from 'services/sortOrderServices';
import { IGolfer } from 'models/IGolfer';


@autoinject()
export class GolfersList extends ItemsList {

  constructor(protected api: GolfersApi,
              private sortOrderServices: SortOrderServices) {
    super(api);

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
        { tooltipTitle: "New Golfer", tooltipPlacement: "bottom", onClick: () => this.newItem("golferEdit"), glyph: "fas fa-plus", label: "Add Golfer" },
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
        { action: (item: IGolfer) => this.deleteItem(item), className: "actionButton delete", tooltip: "Delete Item", glyph: "fas fa-trash" },
      ];
  }

  updateRankings() {
    console.log("Update World and FedEx rankings");
    this.api.updateRankings();
  }

}
