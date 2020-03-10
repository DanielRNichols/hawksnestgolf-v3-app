import { Container } from "aurelia-framework";
import { Router } from "aurelia-router";
import { IBet } from "../../models/IBet";
import { NotificationServices } from "services/notificationServices";
import { ApiError } from "models/ApiError";
import { PromptDialogServices } from "services/promptDialogServices";
import { IHawksNestGolfApi } from "services/hawksnestgolfApi/IHawksNestGolfApi";
import { IItem } from "models/IItem";

export class BaseResourceUtilities{

  protected api: IHawksNestGolfApi;
  private static router: Router = Container.instance.get(Router);
  private static notificationService: NotificationServices = Container.instance.get(NotificationServices); 
  private static promptDialogServices: PromptDialogServices = Container.instance.get(PromptDialogServices);

  static async deleteItem(api: IHawksNestGolfApi, item: IItem, route: string, prompt: string, title: string = "") {
    const verified = await this.promptDialogServices.YesNo(prompt);
    if(verified) {
      const result = await api.delete(item.id);
      console.log(`Deleted: ${result}`);
      if(result instanceof ApiError) {
        this.notificationService.error(result.status.toString(), result.message);
        this.router.navigateToRoute(route);   
      } else {
        this.notificationService.info(title, "Deleted");
        this.router.navigateToRoute(route);
      }
    } else {
      this.notificationService.info(title, "Canceled");
      this.router.navigateToRoute(route);
    }
  }

}
