import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { ValidationController, ValidationControllerFactory, Validator, validateTrigger, ValidationRules } from "aurelia-validation";
import { IGolfer } from "../../models/IGolfer";
import { NotificationServices } from "services/notificationServices";
import { GolfersApi } from "services/hawksnestgolfApi/golfersApi";
import { BaseResourceUtilities, ResourceApiFormMode } from "admin/baseResource/baseResourceUtilities";
import { ApiError } from "models/ApiError";


@autoinject
export class GolferEdit {
  private formTitle = "";
  private formOKLabel = "Save";
  private formCancelLabel = "Cancel";
  private formOKOnClick = () => this.save();
  private formCancelOnClick = () => this.cancel();
  private formReadOnly = false;
  private golfer: IGolfer;
  private mode: ResourceApiFormMode;
  private returnRoute = "golfersList";
  private validationController: ValidationController;
  private isValidated = false;

  constructor(private api: GolfersApi,
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
  
  async activate(golfer: IGolfer) {
    if(golfer.id > 0) {
      const result = await this.api.getById(golfer.id);
      if(result instanceof ApiError) {
        this.notificationService.error(this.formTitle, `Error reading Golfer: ${golfer.id}`);
      } else {
        this.golfer = result;
        this.mode = ResourceApiFormMode.Edit;
      }
    } else {
      this.golfer = { id: 0, pgaTourId: "", name: "", country: "", selectionName: "", worldRanking: 0, fedExRanking: 0, image: "" };
      this.mode = ResourceApiFormMode.Add;
    }
    this.formTitle = `${this.mode == ResourceApiFormMode.Add ? "Add" : "Edit"} ${this.api.resourceDescription}`;
    this.initializeValidationRules();

  }

  private initializeValidationRules() {
    ValidationRules
    .ensure('name').required()
    .ensure('selectionName').required()
    .on(this.golfer);
  }

  private async validateForm() {
    const results = await this.validator.validateObject(this.golfer);
    this.isValidated = results.every(result => result.valid);
  }

  async save() {
    if(this.mode == ResourceApiFormMode.Add) {
      await BaseResourceUtilities.saveItem(this.api, this.golfer, this.returnRoute);
    } else {
      await BaseResourceUtilities.update(this.api, this.golfer, this.returnRoute);
    }
  }

  cancel() {
    this.notificationService.info(this.formTitle, "Canceled");
    this.router.navigateToRoute(this.returnRoute);
  }



}
