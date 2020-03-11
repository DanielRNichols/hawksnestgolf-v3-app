import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IBet } from "../../models/IBet";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { BetsApi } from "services/hawksnestgolfApi/betsApi";
import { BaseResourceUtilities } from "admin/baseResource/baseResourceUtilities";

@autoinject
export class BetDelete {

  formTitle = "Delete Bet";
  formOKLabel = "Delete";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.delete();
  formCancelOnClick = () => this.cancel();
  formReadOnly = true;
  bet: IBet;
  private returnRoute = "betsList";

  constructor(private api: BetsApi,
              private notificationService: NotificationServices,
              private router: Router) {

  }

  async activate(bet: IBet) {
    const result = await this.api.getById(bet.id);
    if(result instanceof ApiError) {
      this.notificationService.error(this.formTitle, `Error reading Bet: ${bet.id}`);
    } else {
      this.bet = result;
    }
}

  async delete() {
    await BaseResourceUtilities.deleteItem(this.api, this.bet, this.returnRoute, this.bet.name, this.formTitle);
  }

  cancel() {
    this.notificationService.info(this.formTitle, "Canceled")
    this.router.navigateToRoute(this.returnRoute);

  }



}
