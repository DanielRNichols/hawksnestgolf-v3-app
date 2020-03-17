import { autoinject } from 'aurelia-framework';
import { ItemsList } from '../../services/itemsListService';
import { TournamentsApi } from '../../services/hawksnestgolfApi/tournamentsApi';
import { SortOrderServices, ISortOrderParams } from 'services/sortOrderServices';
import { ITournament } from 'models/ITournament';

@autoinject()
export class TournamentsList extends ItemsList {

   constructor(protected api: TournamentsApi,
              private sortOrderServices: SortOrderServices) {
    super(api);

    this.listParams =
      {
        listHeader: "Tournaments",

        sortOrderParams: this.sortOrderServices.get('tournaments', "ordinal", "+"),
        filterParams: { filterString: '', filterOn: 'name', filterOnLabel: 'Name' },
        //pageSize: 25,
        //skip: 0,
      };

    this.toolbar =
      [
        { tooltipTitle: "New Tournament", tooltipPlacement: "bottom", onClick: () => this.newItem("tournamentEdit"), glyph: "fas fa-plus", label: "Add Tournament" },
      ];

    this.columns =
      [
        { value: (tournament: ITournament) => tournament.id, propertyName: "id", header: "Id", className: "sortable", sortable: true, defaultSortOrder: '+', alignment: "text-center" },
        { value: (tournament: ITournament) => tournament.name, propertyName: "name", header: "Name", className: "sortable", sortable: true, defaultSortOrder: '+' },
        // { value: (tournament: ITournament) => tournament.url, propertyName: "leaderboardUrl", header: "Url", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (tournament: ITournament) => tournament.isOfficial, propertyName: "isOfficial", header: "Official", className: "sortable", sortable: true, defaultSortOrder: '+' },
        { value: (tournament: ITournament) => tournament.ordinal, propertyName: "ordinal", header: "Ordinal", className: "sortable", sortable: true, defaultSortOrder: '+' },
      ];

    this.actions =
      [
        { action: (tournament:ITournament) => this.editItem(tournament, "tournamentEdit"), className: "actionButton", tooltip: "Edit Tournament", glyph: "fas fa-edit"},
        { action: (tournament:ITournament) => this.deleteItem(tournament), className: "actionButton delete", tooltip: "Delete Tournament", glyph: "fas fa-trash" },
      ];
  }
}
