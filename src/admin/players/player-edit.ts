import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { ValidationController, ValidationControllerFactory, Validator, validateTrigger, ValidationRules } from "aurelia-validation";
import { IPlayer } from "../../models/IPlayer";
import { NotificationServices } from "services/notificationServices";
import { PlayersApi } from "services/hawksnestgolfApi/playersApi";
import { BaseResourceUtilities, ResourceApiFormMode } from "admin/baseResource/baseResourceUtilities";
import { ApiError } from "models/ApiError";



@autoinject
export class PlayerEdit {
  private formTitle = "";
  private formOKLabel = "Save";
  private formCancelLabel = "Cancel";
  private formOKOnClick = () => this.save();
  private formCancelOnClick = () => this.cancel();
  private formReadOnly = false;
  private player: IPlayer;
  private mode: ResourceApiFormMode;
  private returnRoute = "playersList";
  private validationController: ValidationController;
  private isValidated = false;

  constructor(private api: PlayersApi,
              private router: Router,
              private notificationService: NotificationServices,
              private validationControllerFactory: ValidationControllerFactory,
              private validator: Validator) {
    
    this.validationController = validationControllerFactory.createForCurrentScope();
    this.validationController.validateTrigger = validateTrigger.changeOrBlur;

    this.validationController.subscribe(
      async (event) => {
        await this.validateForm()
      });
  }
  
  async activate(player: IPlayer) {
    if(player.id > 0) {
      const result = await this.api.getById(player.id);
      if(result instanceof ApiError) {
        this.notificationService.error(this.formTitle, `Error reading Player: ${player.id}`);
      } else {
        this.player = result;
        this.mode = ResourceApiFormMode.Edit;
      }
    } else {
      this.player = { id: 0, name: "", userName: "", email: "", email2: "", isAdmin: false };
      this.mode = ResourceApiFormMode.Add;
    }
    this.formTitle = `${this.mode == ResourceApiFormMode.Add ? "Add" : "Edit"} ${this.api.resourceDescription}`;
    this.initializeValidationRules();

  }

  private initializeValidationRules() {
    ValidationRules
    .ensure('name').required()
    .ensure('userName').required()
    .ensure('email').email()
    .ensure('email2').email()
    .on(this.player);
  }

  private async validateForm() {
    const results = await this.validator.validateObject(this.player);
    this.isValidated = results.every(result => result.valid);
  }

  async save() {
    if(this.mode == ResourceApiFormMode.Add) {
      await BaseResourceUtilities.saveItem(this.api, this.player, this.returnRoute);
    } else {
      await BaseResourceUtilities.update(this.api, this.player, this.returnRoute);
    }
  }

  cancel() {
    this.notificationService.info(this.formTitle, "Canceled");
    this.router.navigateToRoute(this.returnRoute);
  }



}
