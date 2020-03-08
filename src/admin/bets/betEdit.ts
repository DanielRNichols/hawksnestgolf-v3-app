import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IBet } from "../../models/IBet";
import { BetsApi } from "services/hawksnestgolfApi/betsApi";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";

@autoinject
export class BetEdit {

  public formTitle = "Edit Bet";
  public bet: IBet;

  constructor(private api: BetsApi, 
              private router: Router,
              private notificationService: NotificationServices) {
  }

  activate(params) {
    return this.api.getById(params.id)
      .then(bet => {
        this.bet = bet;
      });
  }

  save() {
    this.api.update(this.bet)
      .then(result => {
        if(result instanceof ApiError) {
          this.notificationService.error(result.status.toString(), result.message);
        } else {
          this.notificationService.info("Edit Bet", "Saved");
        }
        this.router.navigateToRoute("betsList");
      });
  }

  cancel() {
    this.notificationService.info("Edit Bet", "Canceled")
    this.router.navigateToRoute("betsList");

  }



}
