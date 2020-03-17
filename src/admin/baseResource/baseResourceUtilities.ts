import { Container } from "aurelia-framework";
import { Router } from "aurelia-router";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { IResourceApi } from "services/hawksnestgolfApi/IResourceApi";
import { IItem } from "models/IItem";

export enum ResourceApiFormMode {
  Add,
  Edit
}

export class BaseResourceUtilities{

  private static router: Router = Container.instance.get(Router);
  private static notificationService: NotificationServices = Container.instance.get(NotificationServices); 
 
  static async saveItem(api: IResourceApi, item: IItem, route: string) {
    const result = await api.add(item);
    const title = `Add ${api.resourceDescription}`;
    if(result instanceof ApiError) {
      this.notificationService.error(title, `Error adding ${api.resourceDescription}</br>${result.status.toString()}:  ${result.message}`);
    } else {
     this. notificationService.info(title, `Added ${api.resourceDescription}`);
    }
    this.router.navigateToRoute(route);
  }

  static async update(api: IResourceApi, item: IItem, route: string) {
    const result = await api.update(item);
    const title = `Update ${api.resourceDescription}`;
    if(result instanceof ApiError) {
      this.notificationService.error(title, `Error updating ${api.resourceDescription}</br>${result.status.toString()}:  ${result.message}`);
    } else {
      this.notificationService.info(title, `Updated ${api.resourceDescription}`);
    }
    this.router.navigateToRoute(route);
  }

}
