import * as toastr from 'toastr';

export class NotificationServices {
    showNotifications: boolean;
    constructor () {
        this.showNotifications = true;
    }

    setShowNotifications (show: boolean) {
        this.showNotifications = show;
    }

    setPosition (pos: string) {
        toastr.options.positionClass = "toast-" + pos;
    }

    setDuration (duration: number) {
        toastr.options.showDuration = duration;
    }

    setTimeOut (timeOut: number) {
        toastr.options.timeOut = timeOut;
    }

    warning (title: string, msg: string) {
        if (this.showNotifications)
            toastr.warning(title, msg);
        console.log('Warning: ' + title + ((title == '') ? '' : ':') + msg);
    }

    error (title: string, msg: string) {
        if (this.showNotifications)
            toastr.error(title, msg);
        console.log('Error: ' + title + ((title == '') ? '' : ':') + msg);
    }

    success (title: string, msg: string) {
        if (this.showNotifications)
            toastr.success(title, msg);
        console.log('Success: ' + title + ((title == '') ? '' : ':') + msg);
    }

    info (title: string, msg: string) {
        if (this.showNotifications)
            toastr.info(title, msg);
        console.log('Info: ' + title + ((title == '') ? '' : ':') + msg);
    }
}
