import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IGolfer } from "../../models/IGolfer";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { GolfersApi } from "services/hawksnestgolfApi/golfersApi";
import { BaseResourceUtilities } from "admin/baseResource/baseResourceUtilities";

@autoinject
export class GolferEdit {

  formTitle = "Edit Golfer";
  formOKLabel = "Save";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.update();
  formCancelOnClick = () => this.cancel();
  formReadOnly = false;
  golfer: IGolfer;
  private returnRoute = "golfersList";

  constructor(private api: GolfersApi, 
              private router: Router,
              private notificationService: NotificationServices) {
  }

  async activate(golfer: IGolfer) {
    const result = await this.api.getById(golfer.id);
    if(result instanceof ApiError) {
      this.notificationService.error(this.formTitle, `Error reading Golfer: ${golfer.id}`);
    } else {
      this.golfer = result;
    }
  }

  async update() {
    BaseResourceUtilities.update(this.api, this.golfer, this.returnRoute, this.golfer.name, this.formTitle);
  }

  cancel() {
    this.notificationService.info(this.formTitle, "Canceled")
    this.router.navigateToRoute(this.returnRoute);

  }



}
