var browser = chrome;


class Settings {
    constructor() {
        this.readStorage();
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
// sould be replaced with a promise later on to make sure the settings are read before the script continues and reduce the delay
function delayed() {
    //bold and red the logged booleans 
    console.log("%csettings.highlight: " + settings.highlight + "  settings.searchbars: " + settings.searchbars + "  settings.homepage: " + settings.homepage, "color: blue; font-weight: bold;");

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

    // fill an dict with toggleSwitches and their id as key   
    const toggleSwitchesDict = {};
    toggleSwitches.forEach((toggleSwitch) => {
        toggleSwitchesDict[toggleSwitch.id] = toggleSwitch;
    });
    console.log(toggleSwitchesDict);

    // add a click event listener to all the toggle switches
    // when clicked, toggle the "toggle-ON" class and update the associated setting
    toggleSwitches.forEach((toggleSwitch) => {
        toggleSwitch.addEventListener("click", () => {
            toggleSwitch.classList.toggle("toggle-ON");
            settings[toggleSwitch.id] = toggleSwitch.classList.contains("toggle-ON");
            // log the setting name and its value
            console.log(toggleSwitch.id + " changed to " + settings[toggleSwitch.id]);
        });
    }
    );
}

var settings = new Settings();
setTimeout(delayed,15);

