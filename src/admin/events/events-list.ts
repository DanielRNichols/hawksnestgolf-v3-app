import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from "aurelia-router";
import { ItemsList } from '../../services/itemsListService';
import { EventsApi } from '../../services/hawksnestgolfApi/eventsApi';
import { SortOrderServices, ISortOrderParams } from 'services/sortOrderServices';
import { NotificationServices } from 'services/notificationServices';
import { IEvent } from 'models/IEvent';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';



@autoinject()
export class EventsList extends ItemsList {

  // The parent class ItemsList requires Router, NotificationServices and EventAggregator
  constructor(private api: EventsApi,
              private sortOrderServices: SortOrderServices,
              router: Router,
              notifications: NotificationServices,
              eventAggregator: EventAggregator, ) {
    super(router, notifications, eventAggregator);
    
    this.itemDesc = 'Event';

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
        { tooltipTitle: "New Event", tooltipPlacement: "bottom", onClick: () => this.newItem("eventAdd"), glyph: "fas fa-plus" },
       ];

    this.columns =
      [
        { value: (event: IEvent) => event.id, propertyName: "id", header: "Id", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (event: IEvent) => event.eventNo, propertyName: "eventNo", header: "Event No", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (event: IEvent) => event.year, propertyName: "year", header: "Year", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (event: IEvent) => event.tournament.name, propertyName: "tournamentId", header: "Tournament", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (event: IEvent) => event.status, propertyName: "status", header: "Status", className: "sortable", sortable: false, defaultSortOrder: '+' },
      ];

    this.actions =
      [
        // { action: (event) => this.editItem(event, "eventEdit"), class: "actionButton", tooltip: "Edit Event", glyph: "glyphicon glyphicon-edit"},
        // { action: (event) => this.deleteItem(event), class: "actionButton delete", tooltip: "Delete Event", glyph: "glyphicon glyphicon-trash" },
      ];
  }

  fetchData = async (params: IQueryParams): Promise<IEvent[] | ApiError> => {
    return this.api.get(params);
  }


}
