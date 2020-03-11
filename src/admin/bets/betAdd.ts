import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IBet } from "../../models/IBet";
import { NotificationServices } from "services/notificationServices";
import { BetsApi } from "services/hawksnestgolfApi/betsApi";
import { BaseResourceUtilities } from "admin/baseResource/baseResourceUtilities";

@autoinject
export class BetAdd {
  formTitle = "Add Bet";
  formOKLabel = "Save";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.add();
  formCancelOnClick = () => this.cancel();
  formReadOnly = false;
  bet: IBet = { id: 0, name: "", defAmount: 0 };
  private returnRoute = "betsList";

  constructor(private api: BetsApi,
              private router: Router,
              private notificationService: NotificationServices) {
  }

  async add() {
    await BaseResourceUtilities.saveItem(this.api, this.bet, this.returnRoute, this.bet.name, this.formTitle)
  }

  cancel() {
    this.notificationService.info(this.formTitle, "Canceled");
    this.router.navigateToRoute(this.returnRoute);
  }



}
