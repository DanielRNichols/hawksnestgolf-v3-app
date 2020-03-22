import { autoinject } from 'aurelia-framework'
import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import { NotificationServices } from "./services/notificationServices";
import 'bootstrap';

@autoinject()
export class App {
    public router: Router;
    private notificationServices: NotificationServices;
    public version = '3.1.0';

    constructor(notificationServices: NotificationServices) {
        this.notificationServices = notificationServices;
    }

    bind() {
        this.configureNotifications();
    }

    configureNotifications() {
        this.notificationServices.setPosition("bottom-center");
        this.notificationServices.setDuration(200);
        this.notificationServices.setTimeOut(1000);

    }

    configureRouter(config: RouterConfiguration, router: Router) {
       config.title = 'HawksNestGolf v3';
       config.map([
            {
                route: ["", "home"],
                moduleId: "components/home/home",
                title: "Home",
                name: "home",
                nav: true
            },
          //   {
          //       route: ["results"],
          //       moduleId: "results/resultsList",
          //       title: "Results",
          //       name: "results",
          //       nav: true
          //   },

          // bets
          {route: ["admin/bets"],      moduleId: "admin/bets/bets-list", title: "Bets",       name: "betsList",  nav: true},
          {route: ["admin/betEdit"],   moduleId: "admin/bets/bet-edit",  title: "Edit Bet",   name: "betEdit",   nav: false},

          //players
          {route: ["admin/players"],      moduleId: "admin/players/players-list", title: "Players",       name: "playersList",  nav: true},
          {route: ["admin/playerEdit"],   moduleId: "admin/players/player-edit",  title: "Edit Player",   name: "playerEdit",   nav: false},

          // tournaments
          {route: ["admin/tournaments"],      moduleId: "admin/tournaments/tournaments-list", title: "Tournaments",       name: "tournamentsList",  nav: true},
          {route: ["admin/tournamentEdit"],   moduleId: "admin/tournaments/tournament-edit",  title: "Edit Tournament",   name: "tournamentEdit",   nav: false},

          // golfers
          {route: ["admin/golfers"],      moduleId: "admin/golfers/golfers-list", title: "Golfers",       name: "golfersList",  nav: true},
          {route: ["admin/golferEdit"],   moduleId: "admin/golfers/golfer-edit",  title: "Edit Golfer",   name: "golferEdit",   nav: false},

          // events
          {route: ["admin/events"],      moduleId: "admin/events/events-list", title: "Events",       name: "eventsList",  nav: true},
          {route: ["admin/eventEdit"],   moduleId: "admin/events/event-edit",   title: "Edit Event",   name: "eventEdit",   nav: false},
          {route: ["admin/eventResults"],   moduleId: "admin/events/event-results",   title: "Event Results",   name: "eventResults",   nav: false},
          {route: ["admin/eventTeams"],   moduleId: "admin/events/event-teams",   title: "Event Teams",   name: "eventTeams",   nav: false},


          {route: ["admin/entries"], moduleId: "admin/entries/entries-list", title: "Entries", name: "entries", nav: true},
          {route: ["admin/picks"], moduleId: "admin/picks/picks-list", title: "Picks", name: "picks", nav: true},
          { route: ["admin/field"], moduleId: "admin/field/field-list", title: "Field", name: "field", nav: true},

          //{ route: ["admin/selectionEntries"], moduleId: "admin/selectionEntries/selection-entries-list", title: "SelectionEntries", name: "selectionEntries", nav: true},
          //{ route: ["admin/selectionPicks"], moduleId: "admin/selectionPicks/selection-picks-list", title: "SelectionPicks", name: "selectionPicks", nav: true},
        ]);

        this.router = router;
    }

}



