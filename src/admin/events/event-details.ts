import { autoinject } from "aurelia-framework";
import { EventResultsApi } from "services/hawksnestgolfApi/eventResultsApi";
import { SortOrderServices } from "services/sortOrderServices";
import { ItemsList } from "services/itemsListService";
import { IEventResult } from "models/IEventResult";
import { IEvent } from "models/IEvent";
import { ApiError } from "models/ApiError";
import { IQueryParams } from "services/queryParamsService";

@autoinject
export class EventResultsEdit extends ItemsList {

  event: IEvent;

  constructor(private eventResultsApi: EventResultsApi,
    private sortOrderServices: SortOrderServices) {
    super(eventResultsApi);

    let sortOrderKey = "results";
    let sortOrder = this.sortOrderServices.get(sortOrderKey, "betid", "+");

    this.listParams =
    {
      listHeader: "Results",

      sortOrderParams: this.sortOrderServices.get('results', "id", "+"),
      filterParams: { filterString: '', filterOn: 'bet.name', filterOnLabel: 'Name' },
    };

    this.toolbar =
      [
        { tooltipTitle: "Add Result", tooltipPlacement: "bottom", onClick: () => this.newItem("eventResultEdit"), glyph: "fas fa-add", label: "Add Result" },
      ];

    this.columns =
      [
        { value: (result: IEventResult) => result.betId, propertyName: "betid", header: "Bet Id", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (result: IEventResult) => result.bet.name, propertyName: "bet.name", header: "Bet", className: "", sortable: false, defaultSortOrder: '+', alignment: "text-left" },
        { value: (result: IEventResult) => result.entry.player.name, propertyName: "entry.player.name", header: "Player", className: "", sortable: false, defaultSortOrder: '+', alignment: "text-left" },
        { value: (result: IEventResult) => result.amount, propertyName: "amount", header: "Amount", className: "", sortable: false, defaultSortOrder: '+', alignment: "text-center" },
      ];

    this.actions =
      [
        { action: (result: IEventResult) => this.editItem(result, "eventResultEdit"), className: "actionButton", tooltip: "Edit Result", glyph: "fas fa-edit" },
        { action: (result: IEventResult) => this.deleteItem(result), className: "actionButton delete", tooltip: "Delete Result", glyph: "fas fa-trash" },
      ];
  }

  async activate(event: IEvent) {
    this.event = event;
    this.listParams.listHeader = `${event.year} ${event.tournament.name}`;
    this.listParams.filterParams.filterOn = "eventid";
    this.listParams.filterParams.filterString = `${event.id}`;
    this.listParams.filterParams.useEquals =  true;
    this.listParams.filterParams.hideFilter = true;
  }

  // async getItems(): Promise<IEventResult[] | ApiError> {
  //   const result = await this.eventResultsApi.getByEventId(this.event.id);
  //   console.log(result);

  //   return result;
  // }

}
