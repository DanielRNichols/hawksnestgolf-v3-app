import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IPlayer } from "../../models/IPlayer";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { PromptDialogServices } from "services/promptDialogServices";
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
              private notificationService: NotificationServices,
              private promptDialogServices: PromptDialogServices) {
  }

  async activate(params) {
    const result = await this.api.getById(params.id);
    if(result instanceof ApiError) {
      this.notificationService.error(result.status.toString(), result.message);
    } else {
      this.player = result;
    }
  }

  async delete() {
    BaseResourceUtilities.deleteItem(this.api, this.player, this.returnRoute, `Delete ${this.player.name}?`, this.formTitle);
  }

  cancel() {
    this.notificationService.info("Delete Player", "Canceled")
    this.router.navigateToRoute(this.returnRoute);
  }



}
