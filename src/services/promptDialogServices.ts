import { autoinject } from "aurelia-framework";
import { DialogService } from "aurelia-dialog";
import { PromptDialog, PromptDialogProps } from '../resources/elements/prompt-dialog';

@autoinject
export class PromptDialogServices {

  constructor(private dialogService: DialogService) {

  }

  async open(props: PromptDialogProps) : Promise<boolean> {
    return new Promise<boolean>((resolve) => { 
      this.dialogService.open({ viewModel: PromptDialog, model: props})
        .whenClosed(response => {
          resolve(!response.wasCancelled);
        });
    });
  }

  async OKCancel(prompt: string) : Promise<boolean> {
    const props: PromptDialogProps = {prompt: prompt, okLabel: "OK", cancelLabel: "Cancel"};
    return this.open(props);
  }

  async YesNo(prompt: string) : Promise<boolean> {
    console.log(`YesNo Prompt = ${prompt}`);
    const props: PromptDialogProps = {prompt: prompt, okLabel: "Yes", cancelLabel: "No"};
    return this.open(props);
  }
}

