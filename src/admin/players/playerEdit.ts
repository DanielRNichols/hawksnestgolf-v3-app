import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IPlayer } from "../../models/IPlayer";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { PlayersApi } from "services/hawksnestgolfApi/playersApi";
import { BaseResourceUtilities } from "admin/baseResource/baseResourceUtilities";

@autoinject
export class PlayerEdit {

  formTitle = "Edit Player";
  formOKLabel = "Save";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.update();
  formCancelOnClick = () => this.cancel();
  formReadOnly = false;
  player: IPlayer;
  private returnRoute = "playersList";

  constructor(private api: PlayersApi, 
              private router: Router,
              private notificationService: NotificationServices) {
  }

  async activate(params) {
    const result = await this.api.getById(params.id);
    if(result instanceof ApiError) {
      this.notificationService.error(this.formTitle, `Error reading Player: ${params.id}`);
    } else {
      this.player = result;
    }
  }

  async update() {
    BaseResourceUtilities.update(this.api, this.player, this.returnRoute, this.player.name, this.formTitle);
  }

  cancel() {
    this.notificationService.info(this.formTitle, "Canceled")
    this.router.navigateToRoute(this.returnRoute);
  }



}
