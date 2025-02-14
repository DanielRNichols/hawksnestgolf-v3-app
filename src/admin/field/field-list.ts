import { autoinject } from 'aurelia-framework';
import { ItemsList } from '../../services/itemsListService';
import { FieldApi } from '../../services/hawksnestgolfApi/fieldApi';
import { SortOrderServices, ISortOrderParams } from 'services/sortOrderServices';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';
import { IFieldEntry } from 'models/IFieldEntry';

@autoinject()
export class FieldList extends ItemsList {

  constructor(protected api: FieldApi,
              private sortOrderServices: SortOrderServices) {
    super(api);

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
        { tooltipTitle: "Delete Field", tooltipPlacement: "bottom", onClick: () => this.deleteAll(), glyph: "fas fa-trash", label: "Delete All" },
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
        //{ action: (item) => this.editItem(item, "golferEdit"), className: "actionButton", tooltip: "Edit Item", glyph: "fas fa-edit"},
        //{ action: (item) => this.deleteItem(item), className: "actionButton delete", tooltip: "Delete Item", glyph: "fas fa-trash" },
      ];
  }

  fetchData = async (params: IQueryParams): Promise<IFieldEntry[] | ApiError> => {
    return this.api.get(params);
  }

  async deleteAll() {
    console.log("Delete the field");

  }

}
