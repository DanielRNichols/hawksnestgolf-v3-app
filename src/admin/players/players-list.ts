import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from "aurelia-router";
import { ItemsList } from '../../services/itemsListService';
import { SortOrderServices, ISortOrderParams } from 'services/sortOrderServices';
import { NotificationServices } from 'services/notificationServices';
import { IPlayer } from 'models/IPlayer';
import { IQueryParams } from 'services/queryParamsService';
import { ApiError } from 'models/ApiError';
import { PlayersApi } from 'services/hawksnestgolfApi/playersApi';

@autoinject()
export class PlayersList extends ItemsList {

  // The parent class ItemsList requires Router, NotificationServices and EventAggregator
  constructor(private api: PlayersApi,
              private sortOrderServices: SortOrderServices,
              router: Router,
              notifications: NotificationServices,
              eventAggregator: EventAggregator) {
    super(router, notifications, eventAggregator);
    this.itemDesc = "Player";

    this.listParams =
      {
        listHeader: "Players",

        sortOrderParams: this.sortOrderServices.get('players', "Id", "+"),
        filterParams: { filterString: '', filterOn: 'name', filterOnLabel: 'Name' },
        //pageSize: 25,
        //skip: 0,
      };

    this.toolbar =
      [
        { tooltipTitle: "New Player", tooltipPlacement: "bottom", onClick: () => this.newItem("playerAdd"), glyph: "fas fa-plus", label: "Add Player" },
      ];

    this.columns =
      [
        { value: (player: IPlayer) => player.id, propertyName: "id", header: "Id", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (player: IPlayer) => player.name, propertyName: "name", header: "Name", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (player: IPlayer) => player.userName, propertyName: "userName", header: "UserName", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (player: IPlayer) => player.email, propertyName: "email", header: "Email", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (player: IPlayer) => player.email2, propertyName: "email2", header: "Email 2", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (player: IPlayer) => player.isAdmin, propertyName: "isAdmin", header: "Admin", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
      ];

    this.actions =
      [
        { action: (item: IPlayer) => this.editItem(item, "playerEdit"), className: "actionButton", tooltip: "Edit Item", glyph: "fas fa-edit"},
        { action: (item: IPlayer) => this.deleteItem(item, "playerDelete"), className: "actionButton delete", tooltip: "Delete Item", glyph: "fas fa-trash" },
      ];
  }

  fetchData = async (params: IQueryParams): Promise<IPlayer[] | ApiError> => {
    return this.api.get(params);
  }

}
