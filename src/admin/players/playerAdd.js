import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { DbPlayer } from "../../resources/services/dataServices/dbPlayer";

@inject(DbPlayer, Router)
export class PlayerAdd {

    constructor(dbPlayer, router) {
        this.dbPlayer = dbPlayer;
        this.router = router;
        this.formTitle = "New Player";
        this.player = { id: 0, name: "", userName: "", email: "", email2: "", isAdmin: false };

    }

    activate() {
    }

    save() {
        this.dbPlayer.add(this.player)
            .then(player => {
                this.router.navigateToRoute("playersList");
            });

    }

    cancel() {
        this.router.navigateToRoute("playersList");
    }



}
