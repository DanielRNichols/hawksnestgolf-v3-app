import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from "aurelia-router";
import { ItemsList } from '../../services/itemsListService';
import { TournamentsApi } from '../../services/hawksnestgolfApi/tournamentsApi';
import { SortOrderServices, ISortOrderParams } from 'services/sortOrderServices';
import { NotificationServices } from 'services/notificationServices';
import { ITournament } from 'models/ITournament';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';



@autoinject()
export class TournamentsList extends ItemsList {

  // The parent class ItemsList requires Router, NotificationServices and EventAggregator
  constructor(private api: TournamentsApi,
              private sortOrderServices: SortOrderServices,
              router: Router,
              notifications: NotificationServices,
              eventAggregator: EventAggregator, ) {
    super(router, notifications, eventAggregator);
    
    this.itemDesc = 'Tournament';

    this.listParams =
      {
        listHeader: "Tournaments",

        sortOrderParams: this.sortOrderServices.get('tournaments', "Id", "+"),
        filterParams: { filterString: '', filterOn: 'name', filterOnLabel: 'Name' },
        //pageSize: 25,
        //skip: 0,
      };

    this.toolbar =
      [
        { tooltipTitle: "New Tournament", tooltipPlacement: "bottom", onClick: () => this.newItem("tournamentAdd"), glyph: "fas fa-plus", label: "Add Tournament" },
      ];

    this.columns =
      [
        { value: (tournament: ITournament) => tournament.id, propertyName: "id", header: "Id", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (tournament: ITournament) => tournament.name, propertyName: "name", header: "Name", className: "sortable", sortable: true, defaultSortOrder: '+' },
        // { value: (tournament: ITournament) => tournament.url, propertyName: "leaderboardUrl", header: "Url", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (tournament: ITournament) => tournament.isOfficial, propertyName: "isOfficial", header: "Official", className: "sortable", sortable: true, defaultSortOrder: '+' },
      ];

    this.actions =
      [
        { action: (tournament:ITournament) => this.editItem(tournament, "tournamentEdit"), className: "actionButton", tooltip: "Edit Tournament", glyph: "fas fa-edit"},
        { action: (tournament:ITournament) => this.deleteItem(tournament, "tournamentDelete"), className: "actionButton delete", tooltip: "Delete Tournament", glyph: "fas fa-trash" },
      ];
  }

  fetchData = async (params: IQueryParams): Promise<ITournament[] | ApiError> => {
    return this.api.get(params);
  }


}
