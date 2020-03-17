import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { ValidationController, ValidationControllerFactory, Validator, validateTrigger, ValidationRules } from "aurelia-validation";
import { ITournament } from "../../models/ITournament";
import { NotificationServices } from "services/notificationServices";
import { TournamentsApi } from "services/hawksnestgolfApi/tournamentsApi";
import { BaseResourceUtilities, ResourceApiFormMode } from "admin/baseResource/baseResourceUtilities";
import { ApiError } from "models/ApiError";


@autoinject
export class TournamentEdit {
  private formTitle = "";
  private formOKLabel = "Save";
  private formCancelLabel = "Cancel";
  private formOKOnClick = () => this.save();
  private formCancelOnClick = () => this.cancel();
  private formReadOnly = false;
  private tournament: ITournament;
  private mode: ResourceApiFormMode;
  private returnRoute = "tournamentsList";
  private validationController: ValidationController;
  private isValidated = false;
  private maxOrdinal: number;

  constructor(private api: TournamentsApi,
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
  
  async activate(tournament: ITournament) {
    const maxResult = await this.api.getMaxOrdinal();
    if(maxResult instanceof ApiError) {
      this.notificationService.error(this.formTitle, `Error reading max tournament ordinal: ${tournament.id}`);
    } else {
      this.maxOrdinal = maxResult + 1;
    }
    if(tournament.id > 0) {
      const result = await this.api.getById(tournament.id);
      if(result instanceof ApiError) {
        this.notificationService.error(this.formTitle, `Error reading Tournament: ${tournament.id}`);
      } else {
        this.tournament = result;
        this.mode = ResourceApiFormMode.Edit;
      }
    } else {
      this.tournament = { id: 0, name: "", url: "", isOfficial: false, ordinal: this.maxOrdinal };
      this.mode = ResourceApiFormMode.Add;
    }
    this.formTitle = `${this.mode == ResourceApiFormMode.Add ? "Add" : "Edit"} ${this.api.resourceDescription}`;
    this.initializeValidationRules();

  }

  private initializeValidationRules() {
    ValidationRules
    .ensure('name').required()
    .ensure('ordinal').required()
                      .min(0)
    .on(this.tournament);
  }

  private async validateForm() {
    const results = await this.validator.validateObject(this.tournament);
    this.isValidated = results.every(result => result.valid);
  }

  async save() {
    if(this.mode == ResourceApiFormMode.Add) {
      await BaseResourceUtilities.saveItem(this.api, this.tournament, this.returnRoute);
    } else {
      await BaseResourceUtilities.update(this.api, this.tournament, this.returnRoute);
    }
  }

  cancel() {
    this.notificationService.info(this.formTitle, "Canceled");
    this.router.navigateToRoute(this.returnRoute);
  }



}
