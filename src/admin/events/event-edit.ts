import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { ValidationController, ValidationControllerFactory, Validator, validateTrigger, ValidationRules } from "aurelia-validation";
import { IEvent } from "../../models/IEvent";
import { NotificationServices } from "services/notificationServices";
import { EventsApi } from "services/hawksnestgolfApi/eventsApi";
import { BaseResourceUtilities, ResourceApiFormMode } from "admin/baseResource/baseResourceUtilities";
import { ApiError } from "models/ApiError";
import { ITournament } from "models/ITournament";
import { IYear } from "models/IYear";
import { IEventStatus } from "models/IEventStatus";
import { TournamentsApi } from "services/hawksnestgolfApi/tournamentsApi";
import { YearsApi } from "services/hawksnestgolfApi/yearsApi";
import { EventStatusApi } from "services/hawksnestgolfApi/eventstatusApi";


@autoinject
export class EventEdit {
  private formTitle = "";
  private formOKLabel = "Save";
  private formCancelLabel = "Cancel";
  private formOKOnClick = () => this.save();
  private formCancelOnClick = () => this.cancel();
  private formReadOnly = false;
  private event: IEvent;
  private mode: ResourceApiFormMode;
  private returnRoute = "eventsList";
  private validationController: ValidationController;
  private isValidated = false;
  private tournaments: ITournament[];
  private years: IYear[]; 
  private statusOptions: IEventStatus[];
  private maxEventNo: number;

  constructor(private api: EventsApi,
              private tournamentsApi: TournamentsApi,
              private yearsApi: YearsApi,
              private eventStatusApi: EventStatusApi,
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
  
  async activate(event: IEvent) {
    await this.getFormData();
    if(event.id > 0) {
      const result = await this.api.getById(event.id);
      if(result instanceof ApiError) {
        this.notificationService.error(this.formTitle, `Error reading Event: ${event.id}`);
      } else {
        this.event = result;
        this.mode = ResourceApiFormMode.Edit;
      }
    } else {
      this.event =  {id: 0, tournamentId: 0, eventNo: this.maxEventNo, year: 0, entryFee: 30, status: 0};
      this.mode = ResourceApiFormMode.Add;
    }
    this.formTitle = `${this.mode == ResourceApiFormMode.Add ? "Add" : "Edit"} ${this.api.resourceDescription}`;
    this.initializeValidationRules();
  }

  async getFormData() {
    // max eventno
    const maxEventResult = await this.api.getMaxEventNo();
    if(maxEventResult instanceof ApiError) {
      this.maxEventNo = 0;
      this.notificationService.error(this.formTitle, `Error reading max event number</br>${maxEventResult.status.toString()}:  ${maxEventResult.message}`);
    } else {
      this.maxEventNo = maxEventResult + 1;
    }

    // tournaments
    const tournamentsResult = await this.tournamentsApi.get({orderby: 'ordinal asc'});
    if(tournamentsResult instanceof ApiError) {
      this.notificationService.error(this.formTitle, `Error reading tournaments</br>${tournamentsResult.status.toString()}:  ${tournamentsResult.message}`);
    } else {
      this.tournaments = tournamentsResult;
    }

    // years
    const yearsResult = await this.yearsApi.get({orderby: 'year desc'});
    if(yearsResult instanceof ApiError) {
      this.notificationService.error(this.formTitle, `Error reading years</br>${yearsResult.status.toString()}:  ${yearsResult.message}`);
    } else {
      this.years = yearsResult;
    }
    // eventStatus
    let eventStatusResult = await this.eventStatusApi.get({orderby: 'value asc'});
    if(eventStatusResult instanceof ApiError) {
      this.notificationService.error(this.formTitle, `Error reading event status</br>${eventStatusResult.status.toString()}:  ${eventStatusResult.message}`);
    } else {
      this.statusOptions = eventStatusResult;
    }
  }

  private initializeValidationRules() {
    ValidationRules
    .ensure('eventNo').required().withMessage('Event Number cannot be empty')
                      .min(1).withMessage('Event Number must be greater than zero')
                      
    .on(this.event);
  }

  private async validateForm() {
    const results = await this.validator.validateObject(this.event);
    this.isValidated = results.every(result => result.valid);
  }

  async save() {
    if(this.mode == ResourceApiFormMode.Add) {
      await BaseResourceUtilities.saveItem(this.api, this.event, this.returnRoute);
    } else {
      await BaseResourceUtilities.update(this.api, this.event, this.returnRoute);
    }
  }

  cancel() {
    this.notificationService.info(this.formTitle, "Canceled");
    this.router.navigateToRoute(this.returnRoute);
  }

}

