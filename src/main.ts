import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import 'bootstrap'; // load bootstrap JavaScript

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-validation')
    .plugin('aurelia-dialog', config => {
      config.useDefaults();
      config.settings.lock = true;
    })
    .feature('resources');

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
