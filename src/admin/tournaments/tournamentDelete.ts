import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { ITournament } from "../../models/ITournament";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { PromptDialogServices } from "services/promptDialogServices";
import { TournamentsApi } from "services/hawksnestgolfApi/tournamentsApi";
import { BaseResourceUtilities } from "admin/baseResource/baseResourceUtilities";

@autoinject
export class TournamentDelete {

  formTitle = "Delete Tournament";
  formOKLabel = "Delete";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.delete();
  formCancelOnClick = () => this.cancel();
  formReadOnly = true;
  tournament: ITournament;
  private returnRoute: string = "tournamentsList"

  constructor(private api: TournamentsApi, 
              private router: Router,
              private notificationService: NotificationServices,
              private promptDialogServices: PromptDialogServices) {
  }

  async activate(tournament: ITournament) {
    const result = await this.api.getById(tournament.id);
    if(result instanceof ApiError) {
      this.notificationService.error(this.formTitle, `Error reading Tournament: ${tournament.id}`);
    } else {
      this.tournament = result;
    }
  }

  async delete() {
    await BaseResourceUtilities.deleteItem(this.api, this.tournament, this.returnRoute, this.tournament.name, this.formTitle);
  }

  cancel() {
    this.notificationService.info(this.formTitle, "Canceled")
    this.router.navigateToRoute(this.returnRoute);

  }



}
