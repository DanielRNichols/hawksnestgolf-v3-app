import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { DbPlayer } from "../../resources/services/dataServices/dbPlayer";

@inject(DbPlayer, Router)
export class PlayerEdit {

    constructor(dbPlayer, router) {
        this.formTitle = "Edit Player";
        this.dbPlayer = dbPlayer;
        this.router = router;
    }

    activate(params) {
        return this.dbPlayer.fetchById(params.id)
            .then(player => {
                this.player = player;
            });
    }

    save() {
        this.dbPlayer.save(this.player)
            .then(player => {
                this.router.navigateToRoute("playersList");
            });
    }

    cancel() {
        this.router.navigateToRoute("playersList");

    }



}
