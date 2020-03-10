import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IPlayer } from "../../models/IPlayer";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { PlayersApi } from "services/hawksnestgolfApi/playersApi";

@autoinject
export class PlayerEdit {

  public formTitle = "Edit Player";
  formOKLabel = "Save";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.save();
  formCancelOnClick = () => this.cancel();
  formReadOnly = false;
  public player: IPlayer;

  constructor(private api: PlayersApi, 
              private router: Router,
              private notificationService: NotificationServices) {
  }

  async activate(params) {
    const result = await this.api.getById(params.id);
    if(result instanceof ApiError) {
      this.notificationService.error("Add Players", `Error reading Player: ${params.id}`);
    } else {
      this.player = result;
    }
  }

  async save() {
    const result = await this.api.update(this.player);
    if(result instanceof ApiError) {
      this.notificationService.error(result.status.toString(), result.message);
    } else {
      this.notificationService.info("Edit Player", "Saved");
    }
    this.router.navigateToRoute("playersList");

  }

  cancel() {
    this.notificationService.info("Edit Player", "Canceled")
    this.router.navigateToRoute("playersList");

  }



}
