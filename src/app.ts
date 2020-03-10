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
          //   {
          //       route: ["live"],
          //       moduleId: "live/live",
          //       title: "Live Updates",
          //       name: "live",
          //       nav: true
          //   },
            {
                route: ["admin/events"],
                moduleId: "admin/events/events-list",
                title: "Events",
                name: "eventsList",
                nav: true
            },
          //   {
          //       route: ["admin/eventEdit"],
          //       moduleId: "admin/events/eventEdit",
          //       title: "Edit Event",
          //       name: "eventEdit",
          //       nav: false
          //   },
          //   {
          //       route: ["admin/eventResults"],
          //       moduleId: "admin/eventResults/eventResults",
          //       title: "Event Results",
          //       name: "eventResults",
          //       nav: false
          //   },
          //   {
          //       route: ["admin/eventAdd"],
          //       moduleId: "admin/events/eventAdd",
          //       title: "Add Event",
          //       name: "eventAdd",
          //       nav: false
          //   },

          // bets
          {route: ["admin/bets"],      moduleId: "admin/bets/bets-list", title: "Bets",       name: "betsList",  nav: true},
          {route: ["admin/betEdit"],   moduleId: "admin/bets/betEdit",   title: "Edit Bet",   name: "betEdit",   nav: false},
          {route: ["admin/betAdd"],    moduleId: "admin/bets/betAdd",    title: "Add Bet",    name: "betAdd",    nav: false},
          {route: ["admin/betDelete"], moduleId: "admin/bets/betDelete", title: "Delete Bet", name: "betDelete", nav: false},

          //players
          {route: ["admin/players"],      moduleId: "admin/players/players-list", title: "Players",       name: "playersList",  nav: true},
          {route: ["admin/playerEdit"],   moduleId: "admin/players/playerEdit",   title: "Edit Player",   name: "playerEdit",   nav: false},
          {route: ["admin/playerAdd"],    moduleId: "admin/players/playerAdd",    title: "Add Player",    name: "playerAdd",    nav: false},
          {route: ["admin/playerDelete"], moduleId: "admin/players/playerDelete", title: "Delete Player", name: "playerDelete", nav: false},

          // tournaments
          {route: ["admin/tournaments"],      moduleId: "admin/tournaments/tournaments-list", title: "Tournaments",       name: "tournamentsList",  nav: true},
          {route: ["admin/tournamentEdit"],   moduleId: "admin/tournaments/tournamentEdit",   title: "Edit Tournament",   name: "tournamentEdit",   nav: false},
          {route: ["admin/tournamentAdd"],    moduleId: "admin/tournaments/tournamentAdd",    title: "Add Tournament",    name: "tournamentAdd",    nav: false},
          {route: ["admin/tournamentDelete"], moduleId: "admin/tournaments/tournamentDelete", title: "Delete Tournament", name: "tournamentDelete", nav: false},


          {
                route: ["admin/entries"],
                moduleId: "admin/entries/entries-list",
                title: "Entries",
                name: "entries",
                nav: true
            },
            {
                route: ["admin/picks"],
                moduleId: "admin/picks/picks-list",
                title: "Picks",
                name: "picks",
                nav: true
            },
            {
                route: ["admin/golfers"],
                moduleId: "admin/golfers/golfers-list",
                title: "Golfers",
                name: "golfersList",
                nav: true
            },
            {
                route: ["admin/field"],
                moduleId: "admin/field/field-list",
                title: "Field",
                name: "field",
                nav: true
            },
            {
                route: ["admin/selectionEntries"],
                moduleId: "admin/selectionEntries/selection-entries-list",
                title: "SelectionEntries",
                name: "selectionEntries",
                nav: true
            },
            {
                route: ["admin/selectionPicks"],
                moduleId: "admin/selectionPicks/selection-picks-list",
                title: "SelectionPicks",
                name: "selectionPicks",
                nav: true
            },
        ]);

        this.router = router;
    }

}



