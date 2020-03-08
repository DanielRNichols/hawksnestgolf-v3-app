import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IBet } from "../../models/IBet";
import { BetsApi } from "services/hawksnestgolfApi/betsApi";
import { NotificationServices } from "services/notificationServices";

@autoinject
export class BetAdd {
  formTitle = "New Bet";
  bet: IBet = { id: 0, name: "", defAmount: 0 };

  constructor(private api: BetsApi,
              private router: Router,
              private notificationService: NotificationServices) {
  }

  // activate() {
  // }

  save() {
    this.api.add(this.bet)
      .then(bet => {
        this.notificationService.info("Add Bets", "Bet added");
        this.router.navigateToRoute("betsList");
      });

  }

  cancel() {
    this.notificationService.info("Add Bets", "Canceled");
    this.router.navigateToRoute("betsList");
  }



}
