import { Container } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IBet } from "../../models/IBet";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { PromptDialogServices } from "services/promptDialogServices";
import { IResourceApi } from "services/hawksnestgolfApi/IResourceApi";
import { IItem } from "models/IItem";

export class BaseResourceUtilities{

  protected api: IResourceApi;
  private static router: Router = Container.instance.get(Router);
  private static notificationService: NotificationServices = Container.instance.get(NotificationServices); 
  private static promptDialogServices: PromptDialogServices = Container.instance.get(PromptDialogServices);


  static async saveItem(api: IResourceApi, item: IItem, route: string, itemDesc: string, title: string = "") {
    const result = await api.add(item)
    if(result instanceof ApiError) {
      this.notificationService.error(title, `Error adding ${itemDesc}</br>${result.status.toString()}:  ${result.message}`);
    } else {
     this. notificationService.info(title, `Added ${itemDesc}`);
    }
    this.router.navigateToRoute(route);
  }

  static async update(api: IResourceApi, item: IItem, route: string, itemDesc: string, title: string = "") {
    const result = await api.update(item);
    if(result instanceof ApiError) {
      this.notificationService.error(title, `Error updating ${itemDesc}</br>${result.status.toString()}:  ${result.message}`);
    } else {
      this.notificationService.info(title, `Updated ${itemDesc}`);
    }
    this.router.navigateToRoute(route);
  }

  static async deleteItem(api: IResourceApi, item: IItem, route: string, itemDesc: string, title: string = "") {
    const verified = await this.promptDialogServices.YesNo(`Delete ${itemDesc}?`);
    if(verified) {
      const result = await api.delete(item.id);
      console.log(`Deleted: ${result}`);
      if(result instanceof ApiError) {
        this.notificationService.error(title, `Error deleting ${itemDesc}</br>${result.status.toString()}:  ${result.message}`);
        this.router.navigateToRoute(route);   
      } else {
        this.notificationService.info(title, `Deleted ${itemDesc}`);
        this.router.navigateToRoute(route);
      }
    } else {
      this.notificationService.info(title, "Canceled");
      this.router.navigateToRoute(route);
    }
  }

}
