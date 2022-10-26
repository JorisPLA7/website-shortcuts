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
                // console.log("found value ! key: " + key + " value: " + result[key]);
            }
        });
    }

}

// create a new Settings object// pause the script for .1 second to allow the settings to be read from storage
function delayed(){
    console.log("settings: " + settings);
    console.log("settings.highlight: " + settings.highlight);
    console.log("settings.searchbars: " + settings.searchbars);
    console.log("settings.homepage: " + settings.homepage);
    

    // select all the elements matching the toggle class
    const toggleSwitches = document.querySelectorAll(".toggle");
    
    // initialize the toggle switches "toggle-ON" class based on the settings
    toggleSwitches.forEach((toggleSwitch) => {
        if (settings[toggleSwitch.id]) {
            toggleSwitch.classList.add("toggle-ON");
        } else {
            toggleSwitch.classList.remove("toggle-ON");
        }  
    });


    // list all the settings names 
    const settingsNames = ["highlight", "searchbars", "homepage"];
    for (let i = 0; i < toggleSwitches.length; i++) {
        // add a listener to each toggle switch
        toggleSwitches[i].addEventListener("click", () => {
            // toggle the switch
            toggleSwitches[i].classList.toggle("active");
            // get the settings name from the settingsNames array
            let settingName = settingsNames[i];
            // update the settings object
            settings[settingName] = !settings[settingName];
        });
    }

}


var settings = new Settings();
setTimeout(delayed, 10);

