import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { ITournament } from "../../models/ITournament";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { TournamentsApi } from "services/hawksnestgolfApi/tournamentsApi";
import { BaseResourceUtilities } from "admin/baseResource/baseResourceUtilities";

@autoinject
export class TournamentEdit {

  formTitle = "Edit Tournament";
  formOKLabel = "Save";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.update();
  formCancelOnClick = () => this.cancel();
  formReadOnly = false;
  tournament: ITournament;
  private returnRoute = "tournamentsList";

  constructor(private api: TournamentsApi, 
              private router: Router,
              private notificationService: NotificationServices) {
  }

  async activate(tournament: ITournament) {
    const result = await this.api.getById(tournament.id);
    if(result instanceof ApiError) {
      this.notificationService.error(this.formTitle, `Error reading Tournament: ${tournament.id}`);
    } else {
      this.tournament = result;
    }
  }

  async update() {
    BaseResourceUtilities.update(this.api, this.tournament, this.returnRoute, this.tournament.name, this.formTitle);
  }

  cancel() {
    this.notificationService.info(this.formTitle, "Canceled")
    this.router.navigateToRoute(this.returnRoute);

  }



}
