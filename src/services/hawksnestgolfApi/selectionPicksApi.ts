import {ISelectionPick} from '../../models/ISelectionPick';
import { ResourceApi } from './resourceApi';

export class SelectionPicksApi extends ResourceApi<ISelectionPick> {

  constructor() {
    super('selectionPicks', "SelectionPick");
  }

  itemDescription(selectionPick: ISelectionPick) {
    return selectionPick.id.toString();
  }
}
