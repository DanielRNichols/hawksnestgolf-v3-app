import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { ValidationController, ValidationControllerFactory, Validator, validateTrigger, ValidationRules } from "aurelia-validation";
import { IBet } from "../../models/IBet";
import { NotificationServices } from "services/notificationServices";
import { BetsApi } from "services/hawksnestgolfApi/betsApi";
import { BaseResourceUtilities } from "admin/baseResource/baseResourceUtilities";
import { ApiError } from "models/ApiError";

enum FormMode {
  Add,
  Edit
}

@autoinject
export class BetAdd {
  private formTitle = "";
  private formOKLabel = "Save";
  private formCancelLabel = "Cancel";
  private formOKOnClick = () => this.save();
  private formCancelOnClick = () => this.cancel();
  private formReadOnly = false;
  private bet: IBet;
  private mode: FormMode;
  private returnRoute = "betsList";
  private validationController: ValidationController;
  private isValidated = false;

  constructor(private api: BetsApi,
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
  
  async activate(bet: IBet) {
    if(bet.id > 0) {
      const result = await this.api.getById(bet.id);
      if(result instanceof ApiError) {
        this.notificationService.error(this.formTitle, `Error reading Bet: ${bet.id}`);
      } else {
        this.bet = result;
        this.mode = FormMode.Edit;
      }
    } else {
      this.bet = { id: 0, name: "", defAmount: 10 };
      this.mode = FormMode.Add;
    }
    this.formTitle = `${this.mode == FormMode.Add ? "Add" : "Edit"} ${this.api.resourceDescription}`;
    this.initializeValidationRules();

  }

  private initializeValidationRules() {
    ValidationRules
    .ensure('name').required()
                  .withMessage('Name cannot be empty')
    .ensure('defAmount').required().withMessage('Default Amount is required')
                        .range(5, 100).withMessage('Default Amount must be between $5 and $100')
    .on(this.bet);
  }

  private async validateForm() {
    const results = await this.validator.validateObject(this.bet);
    this.isValidated = results.every(result => result.valid);
  }

  async save() {
    if(this.mode == FormMode.Add) {
      await BaseResourceUtilities.saveItem(this.api, this.bet, this.returnRoute);
    } else {
      await BaseResourceUtilities.update(this.api, this.bet, this.returnRoute);
    }
  }

  cancel() {
    this.notificationService.info(this.formTitle, "Canceled");
    this.router.navigateToRoute(this.returnRoute);
  }



}
