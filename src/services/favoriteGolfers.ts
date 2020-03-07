import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LocalStorageServices } from "./localStorageServices";
import { IGolfer } from '../models/IGolfer';

export enum FavoriteGolferAction {
  Add,
  Remove,
  Toggle
}

@autoinject()
export class FavoriteGolfers {
  private localStorageServices: LocalStorageServices;
  private eventAggregator: EventAggregator;
  private favoriteGolfers: IGolfer[];
  private golfers: IGolfer[];
  private inactiveFavoriteGolferIds: string;

  constructor(localStorageServices: LocalStorageServices,
    eventAggregator: EventAggregator) {
    this.localStorageServices = localStorageServices;
    this.eventAggregator = eventAggregator;

    this.golfers = [];
    this.favoriteGolfers = [];
    this.inactiveFavoriteGolferIds = '';
  }

  setGolfers(golfers: IGolfer[]) {
    this.golfers = golfers;
  }

  processFavoriteGolfer(pgaTourId: string, action: FavoriteGolferAction) {
    if (pgaTourId == null)
      return;
    let found = false;
    let i = 0;
    const fav = this.favoriteGolfers.findIndex((fav) => fav.pgaTourId === pgaTourId);
    if (fav && action != FavoriteGolferAction.Add) {
      this.favoriteGolfers.splice(i, 1);
      //notificationServices.info('', 'Removed favorite golfer: ' +  golfer.name);
    }
    if (!fav && (action != FavoriteGolferAction.Remove)) {
      let golfer = this.findGolferByPGATourId(pgaTourId, this.golfers);
      this.favoriteGolfers.push(golfer);
      //notificationServices.info('', 'Added favorite golfer: ' +  golfer.name);
    }
    this.eventAggregator.publish("FavoritesChanged", this.favoriteGolfers);

    //let activeFavoriteGolferIds = utilsServices.getDelimitedStringOfGolfersIds(favoriteGolfers, ';');
    //thislocalStorageServices.setItem('favoriteGolfers',
    //    activeFavoriteGolferIds +
    //    (activeFavoriteGolferIds == '' ? '' : ';') +
    //    this.inactiveFavoriteGolferIds
    //);
  }

  clearFavoriteGolfers() {
    this.favoriteGolfers = [];
    this.localStorageServices.setItem('favoriteGolfers', this.inactiveFavoriteGolferIds);
    this.eventAggregator.publish("FavoritesChanged", this.favoriteGolfers);
    //notificationServices.info('', 'Cleared Favorites');

  };

  addFavoriteGolfer(pgaTourId: string) {
    this.processFavoriteGolfer(pgaTourId, FavoriteGolferAction.Add);
  };

  removeFavoriteGolfer(pgaTourId: string) {
    this.processFavoriteGolfer(pgaTourId, FavoriteGolferAction.Remove);
  };

  toggleFavoriteGolfer(pgaTourId: string) {
    this.processFavoriteGolfer(pgaTourId, FavoriteGolferAction.Toggle);
  };

  isFavoriteGolfer(pgaTourId: string) {
    return (this.findGolferByPGATourId(pgaTourId, this.favoriteGolfers) != null);
  }

  findGolferByPGATourId(pgaTourId: string, golfers: IGolfer[]) {
    return golfers.find((golfer) => golfer.pgaTourId === pgaTourId);

  }

}

