import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IBet } from "../../models/IBet";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { BetsApi } from "services/hawksnestgolfApi/betsApi";

@autoinject
export class BetEdit {

  public formTitle = "Edit Bet";
  formOKLabel = "Save";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.save();
  formCancelOnClick = () => this.cancel();
  formReadOnly = false;
  public bet: IBet;

  constructor(private api: BetsApi, 
              private router: Router,
              private notificationService: NotificationServices) {
  }

  async activate(params) {
    const result = await this.api.getById(params.id);
    if(result instanceof ApiError) {
      this.notificationService.error("Add Bets", `Error reading Bet: ${params.id}`);
    } else {
      this.bet = result;
    }
  }

  async save() {
    const result = await this.api.update(this.bet);
    if(result instanceof ApiError) {
      this.notificationService.error(result.status.toString(), result.message);
    } else {
      this.notificationService.info("Edit Bet", "Saved");
    }
    this.router.navigateToRoute("betsList");

  }

  cancel() {
    this.notificationService.info("Edit Bet", "Canceled")
    this.router.navigateToRoute("betsList");

  }



}
