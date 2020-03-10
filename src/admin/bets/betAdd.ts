import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IBet } from "../../models/IBet";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { BetsApi } from "services/hawksnestgolfApi/betsApi";

@autoinject
export class BetAdd {
  formTitle = "New Bet";
  formOKLabel = "Save";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.save();
  formCancelOnClick = () => this.cancel();
  formReadOnly = false;
  bet: IBet = { id: 0, name: "", defAmount: 0 };

  constructor(private api: BetsApi,
              private router: Router,
              private notificationService: NotificationServices) {
  }

  async save() {
    const result = await this.api.add(this.bet)
    if(result instanceof ApiError) {
      this.notificationService.error("Add Bets", `Error adding ${this.bet.name}`);
    } else {
      this.notificationService.info("Add Bets", `${this.bet.name} was added`);
    }
    this.router.navigateToRoute("betsList");
  }

  cancel() {
    this.notificationService.info("Add Bets", "Canceled");
    this.router.navigateToRoute("betsList");
  }



}
