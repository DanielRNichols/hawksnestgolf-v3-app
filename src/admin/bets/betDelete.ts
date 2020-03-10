import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IBet } from "../../models/IBet";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { PromptDialogServices } from "services/promptDialogServices";
import { BetsApi } from "services/hawksnestgolfApi/betsApi";
import { BaseResourceUtilities } from "admin/baseResource/baseResourceUtilities";

@autoinject
export class BetDelete {

  public formTitle = "Delete Bet";
  formOKLabel = "Delete";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.delete();
  formCancelOnClick = () => this.cancel();
  formReadOnly = true;
  public bet: IBet;
  private returnRoute: string = "betsList";

  constructor(private api: BetsApi,
              private notificationService: NotificationServices,
              private router: Router) {

  }

  async activate(bet: IBet) {
    const result = await this.api.getById(bet.id);
    if(result instanceof ApiError) {
      this.notificationService.error(result.status.toString(), result.message);
    } else {
      this.bet = result;
    }
}

  async delete() {
    BaseResourceUtilities.deleteItem(this.api, this.bet, this.returnRoute, `Delete ${this.bet.name}?`, this.formTitle);
  }

  cancel() {
    this.notificationService.info(this.formTitle, "Canceled")
    this.router.navigateToRoute(this.returnRoute);

  }



}
