import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IGolfer } from "../../models/IGolfer";
import { NotificationServices } from "services/notificationServices";
import { GolfersApi } from "services/hawksnestgolfApi/golfersApi";
import { BaseResourceUtilities } from "admin/baseResource/baseResourceUtilities";

@autoinject
export class GolferAdd {
  formTitle = "Add Golfer";
  formOKLabel = "Save";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.add();
  formCancelOnClick = () => this.cancel();
  formReadOnly = false;
  golfer: IGolfer = { id: 0, pgaTourId: "", name: "", country: "", selectionName: "", worldRanking: 0, fedExRanking: 0, image: "" };
  private returnRoute = "golfersList";

  constructor(private api: GolfersApi,
              private router: Router,
              private notificationService: NotificationServices) {
  }

  async add() {
    await BaseResourceUtilities.saveItem(this.api, this.golfer, this.returnRoute, this.golfer.name, this.formTitle)
  }

  cancel() {
    this.notificationService.info(this.formTitle, "Canceled");
    this.router.navigateToRoute(this.returnRoute);
  }



}
