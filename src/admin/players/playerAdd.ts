import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IPlayer } from "../../models/IPlayer";
import { NotificationServices } from "services/notificationServices";
import { PlayersApi } from "services/hawksnestgolfApi/playersApi";
import { BaseResourceUtilities } from "admin/baseResource/baseResourceUtilities";

@autoinject
export class PlayerAdd {

  formTitle = "New Player";
  formOKLabel = "Save";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.update();
  formCancelOnClick = () => this.cancel();
  formReadOnly = false;
  player: IPlayer = { id: 0, name: "", userName: "", email: "", email2: "", isAdmin: false };
  private returnRoute = "playersList";

  constructor(private api: PlayersApi,
              private router: Router,
              private notificationService: NotificationServices) {

  }

  async update() {
    await BaseResourceUtilities.saveItem(this.api, this.player, this.returnRoute, this.player.name, this.formTitle)
  }

  cancel() {
    this.notificationService.info(this.formTitle, "Canceled");
    this.router.navigateToRoute(this.returnRoute);
  }




}
