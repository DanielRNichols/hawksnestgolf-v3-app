export class LocalStorageServices {
  storageSupported: boolean;

  constructor() {
    this.storageSupported = false;
    if (typeof (Storage) != "undefined")
      this.storageSupported = true;
  }

  setItem(key: string, value: any) {
    if (this.storageSupported)
      localStorage.setItem(key, value);
  }

  getItem(key: string, defVal: any): any {
    var retVal = defVal;
    if (this.storageSupported) {
      var storageStr = localStorage.getItem(key);
      if (storageStr != null)
        retVal = storageStr;
    }

    return retVal;
  }

  getBool(key: string, defVal: boolean) {
    let retVal = this.getItem(key, defVal);

    retVal = (!retVal || (retVal === "false") || (retVal === "0")) ? false : true;

    return retVal;
  }

  getInt(key: string, defVal: number) {
    let retVal = parseInt(this.getItem(key, defVal));
    if (isNaN(retVal))
      retVal = 0;

    return retVal;
  }

  getReal(key: string, defVal: number) {
    let retVal = parseFloat(this.getItem(key, defVal));
    if (isNaN(retVal))
      retVal = 0;

    return retVal;
  }

  removeItem(key: string) {
    if (this.storageSupported)
      localStorage.removeItem(key);
  }

}
