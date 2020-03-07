import { autoinject } from 'aurelia-framework';
import { LocalStorageServices } from "./localStorageServices";

@autoinject()
export class Settings {

    private localStorage: LocalStorageServices;
    private showTooltips: boolean;
    private eventId: number;

    constructor(localStorage: LocalStorageServices) {
        this.localStorage = localStorage;
    }

    get ShowTooltips() {
        if (this.showTooltips === undefined) {
            this.showTooltips = this.localStorage.getBool("hawksnestgolf:showTooltips", true);
        }
        return this.showTooltips;
    }
    
    set ShowTooltips(value) {
        this.showTooltips = value;
        this.localStorage.setItem("hawksnestgolf:showTooltips", this.showTooltips);
    }

    get EventId() {
        if (this.eventId === undefined) {
            this.eventId = this.localStorage.getInt("hawksnestgolf:eventId", 0);
        }
        return this.eventId;
    }

    set EventId(value) {
        this.eventId = value;
        this.localStorage.setItem("hawksnestgolf:eventId", this.eventId);
    }

}
