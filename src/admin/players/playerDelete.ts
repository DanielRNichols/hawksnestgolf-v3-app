import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IPlayer } from "../../models/IPlayer";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { PlayersApi } from "services/hawksnestgolfApi/playersApi";
import { BaseResourceUtilities } from "admin/baseResource/baseResourceUtilities";

@autoinject
export class PlayerDelete {

  public formTitle = "Delete Player";
  formOKLabel = "Delete";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.delete();
  formCancelOnClick = () => this.cancel();
  formReadOnly = true;
  public player: IPlayer;
  private returnRoute: string = "playersList";

  constructor(private api: PlayersApi, 
              private router: Router,
              private notificationService: NotificationServices) {
  }

  async activate(player: IPlayer) {
    const result = await this.api.getById(player.id);
    if(result instanceof ApiError) {
      this.notificationService.error(this.formTitle, `Error reading Player: ${player.id}`);
    } else {
      this.player = result;
    }
  }

  async delete() {
    await BaseResourceUtilities.deleteItem(this.api, this.player, this.returnRoute, this.player.name, this.formTitle);
  }

  cancel() {
    this.notificationService.info(this.formTitle, "Canceled")
    this.router.navigateToRoute(this.returnRoute);
  }



}
