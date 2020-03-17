import { autoinject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { ItemsList } from '../../services/itemsListService';
import { EventsApi } from '../../services/hawksnestgolfApi/eventsApi';
import { SortOrderServices, ISortOrderParams } from 'services/sortOrderServices';
import { IEvent } from 'models/IEvent';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';



@autoinject()
export class EventsList extends ItemsList {

  constructor(protected api: EventsApi,
              private sortOrderServices: SortOrderServices) {
    super(api);
    
    this.listParams =
      {
        listHeader: "Events",

        sortOrderParams: this.sortOrderServices.get('events', "eventNo", "-"),
        filterParams: { filterString: '', filterOn: 'name', filterOnLabel: 'Name' },
        //pageSize: 25,
        //skip: 0,
      };

    this.toolbar =
      [
        { tooltipTitle: "New Event", tooltipPlacement: "bottom", onClick: () => this.newItem("eventEdit"), glyph: "fas fa-plus", label: "Add Event" },
       ];

    this.columns =
      [
        { value: (event: IEvent) => event.id, propertyName: "id", header: "Id", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (event: IEvent) => event.eventNo, propertyName: "eventNo", header: "Event No", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (event: IEvent) => event.year, propertyName: "year", header: "Year", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (event: IEvent) => event.tournament.name, propertyName: "tournamentId", header: "Tournament", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (event: IEvent) => event.eventStatus.status, propertyName: "status", header: "Status", className: "sortable", sortable: false, defaultSortOrder: '+' },
      ];

    this.actions =
      [
        { action: (event: IEvent) => this.editItem(event, "eventEdit"), className: "actionButton", tooltip: "Edit Event", glyph: "fas fa-edit"},
        { action: (event: IEvent) => this.eventDetails(event, "eventDetails"), className: "actionButton", tooltip: "Event Details", glyph: "fas fa-list-ol" },
        { action: (event: IEvent) => this.deleteItem(event), className: "actionButton delete", tooltip: "Delete Event", glyph: "fas fa-trash" },
      ];
  }

  eventDetails(event: IEvent, route: string) {
    console.log(`Event Details for  ${event.tournament.name}`);
    this.router.navigateToRoute(route, event);
  }

}
