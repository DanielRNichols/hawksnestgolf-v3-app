import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IEvent } from "../../models/IEvent";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { EventsApi } from "services/hawksnestgolfApi/eventsApi";
import { BaseResourceUtilities } from "admin/baseResource/baseResourceUtilities";
import { TournamentsApi } from "services/hawksnestgolfApi/tournamentsApi";
import { ITournament } from "models/ITournament";
import { YearsApi } from "services/hawksnestgolfApi/yearsApi";
import { IYear } from "models/IYear";
import { EventStatusApi } from "services/hawksnestgolfApi/eventstatusApi";
import { IEventStatus } from "models/IEventStatus";

@autoinject
export class EventEdit {

  formTitle = "Edit Event";
  formOKLabel = "Save";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.update();
  formCancelOnClick = () => this.cancel();
  formReadOnly = false;
  event: IEvent;
  private returnRoute = "eventsList";
  private tournaments: ITournament[];
  private years: IYear[];
  private statusOptions: IEventStatus[];

  constructor(private api: EventsApi, 
              private tournamentsApi: TournamentsApi,
              private yearsApi: YearsApi,
              private eventStatusApi: EventStatusApi,
              private router: Router,
              private notificationService: NotificationServices) {
  }

  async activate(event: IEvent) {
    const result = await this.api.getById(event.id);
    if(result instanceof ApiError) {
      this.notificationService.error(this.formTitle, `Error reading Event: ${event.id}`);
    } else {
      this.event = result;
      let tournamentsResult = await this.tournamentsApi.get({orderby: 'ordinal asc'});
      if(tournamentsResult instanceof ApiError) {
        this.notificationService.error(this.formTitle, `Error reading tournaments</br>${tournamentsResult.status.toString()}:  ${tournamentsResult.message}`);
      } else {
        this.tournaments = tournamentsResult;
        let yearsResult = await this.yearsApi.get({orderby: 'year desc'});
        if(yearsResult instanceof ApiError) {
          this.notificationService.error(this.formTitle, `Error reading years</br>${yearsResult.status.toString()}:  ${yearsResult.message}`);
        } else {
          this.years = yearsResult;
          this.event.year = this.years[0].year;
          let eventStatusResult = await this.eventStatusApi.get({orderby: 'value asc'});
          if(eventStatusResult instanceof ApiError) {
            this.notificationService.error(this.formTitle, `Error reading event status</br>${eventStatusResult.status.toString()}:  ${eventStatusResult.message}`);
          } else {
            this.statusOptions = eventStatusResult;
          }
        }
      }
    }
  }

  async update() {
    const desc = `${this.event.year} ${this.event.tournamentId}`;
    BaseResourceUtilities.update(this.api, this.event, this.returnRoute, desc, this.formTitle);
  }

  cancel() {
    this.notificationService.info(this.formTitle, "Canceled")
    this.router.navigateToRoute(this.returnRoute);

  }



}
