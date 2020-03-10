import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { ITournament } from "../../models/ITournament";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { TournamentsApi } from "services/hawksnestgolfApi/tournamentsApi";

@autoinject
export class TournamentAdd {
  formTitle = "New Tournament";
  formOKLabel = "Save";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.save();
  formCancelOnClick = () => this.cancel();
  formReadOnly = false;
  tournament: ITournament = { id: 0, name: "", url: "", isOfficial: false };

  constructor(private api: TournamentsApi,
              private router: Router,
              private notificationService: NotificationServices) {
  }

  async save() {
    const result = await this.api.add(this.tournament)
    if(result instanceof ApiError) {
      this.notificationService.error("Add Tournaments", `Error adding ${this.tournament.name}`);
    } else {
      this.notificationService.info("Add Tournaments", `${this.tournament.name} was added`);
    }
    this.router.navigateToRoute("tournamentsList");
  }

  cancel() {
    this.notificationService.info("Add Tournaments", "Canceled");
    this.router.navigateToRoute("tournamentsList");
  }



}
