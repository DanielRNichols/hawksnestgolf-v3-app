import {ISelectionEntry} from '../../models/ISelectionEntry';
import { ResourceApi } from './resourceApi';

export class SelectionEntriesApi extends ResourceApi<ISelectionEntry> {

  constructor() {
    super('selectionEntries', "SelectionEntry");
  }

  itemDescription(selectionEntry: ISelectionEntry) {
    return selectionEntry.player ? selectionEntry.player.name : selectionEntry.playerId;
  }
}
