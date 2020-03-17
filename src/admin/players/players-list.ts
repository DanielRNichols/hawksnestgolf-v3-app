import { autoinject } from 'aurelia-framework';
import { ItemsList } from '../../services/itemsListService';
import { SortOrderServices, ISortOrderParams } from 'services/sortOrderServices';
import { IPlayer } from 'models/IPlayer';
import { PlayersApi } from 'services/hawksnestgolfApi/playersApi';

@autoinject()
export class PlayersList extends ItemsList {

  constructor(protected api: PlayersApi,
              private sortOrderServices: SortOrderServices) {
    super(api);

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
        { tooltipTitle: "New Player", tooltipPlacement: "bottom", onClick: () => this.newItem("playerEdit"), glyph: "fas fa-plus", label: "Add Player" },
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
        { action: (item: IPlayer) => this.deleteItem(item), className: "actionButton delete", tooltip: "Delete Item", glyph: "fas fa-trash" },
      ];
  }
}
