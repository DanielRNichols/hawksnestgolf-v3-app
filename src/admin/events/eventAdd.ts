import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IEvent } from "../../models/IEvent";
import { NotificationServices } from "services/notificationServices";
import { EventsApi } from "services/hawksnestgolfApi/eventsApi";
import { BaseResourceUtilities } from "admin/baseResource/baseResourceUtilities";
import { TournamentsApi } from "services/hawksnestgolfApi/tournamentsApi";
import { ITournament } from "models/ITournament";
import { ApiError } from "models/ApiError";
import { YearsApi } from "services/hawksnestgolfApi/yearsApi";
import { IYear } from "models/IYear";
import { IEventStatus } from "models/IEventStatus";
import { EventStatusApi } from "services/hawksnestgolfApi/eventstatusApi";

@autoinject
export class EventAdd {
  formTitle = "Add Event";
  formOKLabel = "Save";
  formCancelLabel = "Cancel";
  formOKOnClick = () => this.add();
  formCancelOnClick = () => this.cancel();
  formReadOnly = false;
  private returnRoute = "eventsList";
  private tournaments: ITournament[];
  private years: IYear[]; // = [{year: 2020}, {year: 2019}]; //, '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007'];
  private statusOptions: IEventStatus[]; // = [{value: 0, status: 'Not Started'}, {value: 1, status: 'In Progress'}, {value: 2, status: 'Completed'}]
  event: IEvent = {id: 0, tournamentId: 0, eventNo: 0, year: 0, entryFee: 30, status: 0};

  constructor(private api: EventsApi,
              private tournamentsApi: TournamentsApi,
              private yearsApi: YearsApi,
              private eventStatusApi: EventStatusApi,
              private router: Router,
              private notificationService: NotificationServices) {
  }

  async activate() {
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

  async add() {
    const desc = `${this.event.year} ${this.event.tournamentId}`;
    await BaseResourceUtilities.saveItem(this.api, this.event, this.returnRoute, desc, this.formTitle)
  }

  cancel() {
    this.notificationService.info(this.formTitle, "Canceled");
    this.router.navigateToRoute(this.returnRoute);
  }



}
