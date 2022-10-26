console.log("popup.js started");
// content-script.js

// function handleResponse(message) {
//     console.log(`Message from the background script: ${message.response}`);
// }

// function handleError(error) {
//     console.log(`Error: ${error}`);
// }

// function notifyBackgroundPage(e) {
//     const sending = browser.runtime.sendMessage({
//         greeting: "Greeting from the content script",
//     });
//     sending.then(handleResponse, handleError);
// }

// window.addEventListener("click", notifyBackgroundPage);

class Settings {
    constructor() {
        this.readStorage();
        // this.listenToStorageChanges();
    }

    // getters and setters
    get highlight() {
        this.readStorage();
        return this._highlight;
    }

    set highlight(value) {
        this._highlight = value;
        this.pushToStorage();
    }

    get searchbars() {
        this.readStorage();
        return this._searchbars;
    }

    set searchbars(value) {
        this._searchbars = value;
        this.pushToStorage();
    }

    get homepage() {
        this.readStorage();
        return this._homepage;
    }

    set homepage(value) {
        this._homepage = value;
        this.pushToStorage();
    }

    // listen to changes on the settings and update the sync settings
    listenToStorageChanges() {
        browser.storage.onChanged.addListener((changes, area) => {
            if (area === "sync") {
                for (let key in changes) {
                    this[key] = changes[key].newValue;
                }
            }
        });
    }

    // write the settings to the browser sync storage on update
    pushToStorage() {
        browser.storage.sync.set(this);
    }

    // force read from storage
    readStorage() {
        browser.storage.sync.get().then((result) => {
            for (let key in result) {
                this[key] = result[key];
                console.log("found value ! key: " + key + " value: " + result[key]);
            }
        });
    }

}
var settings = new Settings();

// create a new Settings object// pause the script for .1 second to allow the settings to be read from storage
setTimeout(function () {
    console.log("settings: " + settings);
    console.log("settings.highlight: " + settings.highlight);
    console.log("settings.searchbars: " + settings.searchbars);
    console.log("settings.homepage: " + settings.homepage);
}, 100);


