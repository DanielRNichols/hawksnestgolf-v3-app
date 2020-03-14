import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { ITournament } from "../../models/ITournament";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { TournamentsApi } from "services/hawksnestgolfApi/tournamentsApi";
import { BaseResourceUtilities } from "admin/baseResource/baseResourceUtilities";

@autoinject
export class TournamentAdd {
  formTitle = "New Tournament";
  formOKLabel = "Save";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.update();
  formCancelOnClick = () => this.cancel();
  formReadOnly = false;
  tournament: ITournament = { id: 0, name: "", url: "", isOfficial: false, ordinal: 0 };
  private returnRoute = "tournamentsList";

  constructor(private api: TournamentsApi,
              private router: Router,
              private notificationService: NotificationServices) {
  }

  async update() {
    await BaseResourceUtilities.saveItem(this.api, this.tournament, this.returnRoute)
  }

  cancel() {
    this.notificationService.info(this.formTitle, "Canceled");
    this.router.navigateToRoute(this.returnRoute);
  }



}
