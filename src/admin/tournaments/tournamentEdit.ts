import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { ITournament } from "../../models/ITournament";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { TournamentsApi } from "services/hawksnestgolfApi/tournamentsApi";

@autoinject
export class TournamentEdit {

  public formTitle = "Edit Tournament";
  formOKLabel = "Save";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.save();
  formCancelOnClick = () => this.cancel();
  formReadOnly = false;
  public tournament: ITournament;

  constructor(private api: TournamentsApi, 
              private router: Router,
              private notificationService: NotificationServices) {
  }

  async activate(params) {
    const result = await this.api.getById(params.id);
    if(result instanceof ApiError) {
      this.notificationService.error("Add Tournaments", `Error reading Tournament: ${params.id}`);
    } else {
      this.tournament = result;
    }
  }

  async save() {
    const result = await this.api.update(this.tournament);
    if(result instanceof ApiError) {
      this.notificationService.error(result.status.toString(), result.message);
    } else {
      this.notificationService.info("Edit Tournament", "Saved");
    }
    this.router.navigateToRoute("tournamentsList");

  }

  cancel() {
    this.notificationService.info("Edit Tournament", "Canceled")
    this.router.navigateToRoute("tournamentsList");

  }



}
