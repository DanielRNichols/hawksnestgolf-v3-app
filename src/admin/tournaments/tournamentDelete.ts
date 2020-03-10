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

  public formTitle = "Delete Tournament";
  formOKLabel = "Delete";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.delete();
  formCancelOnClick = () => this.cancel();
  formReadOnly = true;
  public tournament: ITournament;
  private returnRoute: string = "tournamentsList"

  constructor(private api: TournamentsApi, 
              private router: Router,
              private notificationService: NotificationServices,
              private promptDialogServices: PromptDialogServices) {
  }

  async activate(params) {
    const result = await this.api.getById(params.id);
    if(result instanceof ApiError) {
      this.notificationService.error(result.status.toString(), result.message);
    } else {
      this.tournament = result;
    }
}

async delete() {
  BaseResourceUtilities.deleteItem(this.api, this.tournament, this.returnRoute, `Delete ${this.tournament.name}?`, this.formTitle);
}

  cancel() {
    this.notificationService.info("Delete Tournament", "Canceled")
    this.router.navigateToRoute(this.returnRoute);

  }



}
