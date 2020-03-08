import { autoinject } from 'aurelia-framework'
import { NotificationServices } from "../../services/notificationServices";

@autoinject()
export class Home {
  message: string;

  constructor(private notificationServices: NotificationServices) {
      this.notificationServices = notificationServices;
      this.message = "Welcome to Hawk's Nest Golf";

    }

  async bind() {
    this.notificationServices.info('Welcome', this.message);
  }

}
