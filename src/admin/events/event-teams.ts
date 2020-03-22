import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { EventDetailsApi } from "services/hawksnestgolfApi/eventDetailsApi";
import { IEventDetails } from "models/IEventDetails";


@autoinject
export class EventTeams {

  eventDetails: IEventDetails;
  title =  "";

  constructor(private api: EventDetailsApi,
              private router: Router,
              private notificationService: NotificationServices) {
    
  }
  
  async activate(params: any) {
    const eventId = params.eventId ? params.eventId : 0;
    if(eventId == 0) {
      return;
    }
    const result = await this.api.get(eventId);
    if(result instanceof ApiError) {
      this.notificationService.error("", `Error reading Event: ${eventId}`);
    } else {
      this.eventDetails = result;
      this.title = `${this.eventDetails.event.year} ${this.eventDetails.event.tournament.name} Results`;
    }
  }

}

