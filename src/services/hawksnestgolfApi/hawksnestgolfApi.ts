import { autoinject } from 'aurelia-framework';
import { GolfersApi } from './golfersApi';

@autoinject()
export class HawksNestGolfApi {

  // Note using public constructor assignments here
  constructor(public golfers:GolfersApi) {
  }
}
