import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IPlayer } from "../../models/IPlayer";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { PlayersApi } from "services/hawksnestgolfApi/playersApi";

@autoinject
export class PlayerAdd {

  formTitle = "New Player";
  formOKLabel = "Save";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.save();
  formCancelOnClick = () => this.cancel();
  formReadOnly = false;
  player: IPlayer = { id: 0, name: "", userName: "", email: "", email2: "", isAdmin: false };

  constructor(private api: PlayersApi,
              private router: Router,
              private notificationService: NotificationServices) {

  }

  async save() {
    const result = await this.api.add(this.player)
    if(result instanceof ApiError) {
      this.notificationService.error("Add Players", `Error adding ${this.player.name}`);
    } else {
      this.notificationService.info("Add Players", `${this.player.name} was added`);
    }
    this.router.navigateToRoute("playersList");
  }

  cancel() {
    this.notificationService.info("Add Players", "Canceled");
    this.router.navigateToRoute("playersList");
  }




}
