import { autoinject } from "aurelia-framework";
import { DialogController } from "aurelia-dialog";

export interface PromptDialogProps {
  prompt: string;
  okLabel?: string;
  cancelLabel?: string;
}

@autoinject
export class PromptDialog {
  prompt: string;
  okLabel: string;
  cancelLabel: string;

  constructor(private dialogController: DialogController) {

  }

  activate(props: PromptDialogProps) {
    this.prompt = props.prompt;
    this.okLabel = props.okLabel ? props.okLabel : "OK";
    this.cancelLabel = props.cancelLabel ? props.cancelLabel : "CANCEL";
  }
}
