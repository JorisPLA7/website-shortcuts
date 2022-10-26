
const DEBUG = false;

// wrapper to read and write the settings on the browser sync storage

class Settings {
    constructor() {
        this.readStorage();

        function delayed() {
            if (this._highlight === undefined) {
                this._highlight = true;
            }
            if (this._searchbars === undefined) {
                this._searchbars = true;
            }
            if (this._homepage === undefined) {
                this._homepage = true;
            }
        }
        setTimeout(delayed, 10);

        this.listenToStorageChanges();

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
                // log a message in bold red 
                for (let key in changes) {
                    this[key] = changes[key].newValue;
                }
                // log changes
                for (let key in changes) {
                    if (changes[key].oldValue !== changes[key].newValue) {
                        console.log(`${key} changed from ${changes[key].oldValue} to ${changes[key].newValue}`);
                    }
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
            }
        });
    }

}
// create a new Settings object
var settings = new Settings();

console.log("settings.highlight: " + settings.highlight);
console.log("settings.searchbars: " + settings.searchbars);
console.log("settings.homepage: " + settings.homepage);


// Settings.highlight = true;
// Settings.searchbars = true;
// Settings.homepage = true;

//select search bars and open them on the associated keyboar shortcut.
class WebsiteShortcuts {

    constructor(debug = true,) {
        this.debug = debug;
        this.refreshLoop();
        this.kbShortcutListener();
        this.listenToRuntimeMessages();
    }

    listenToRuntimeMessages() {
        browser.runtime.onMessage.addListener((message) => {
            if (message.command === "test") {
                console.log("test message received");
            }
            else {
                console.log("unknown message received");
            }
        });
    }

    refreshLoop() {
        this.searchbarsRefresh();
        setTimeout(this.refreshLoop.bind(this), 1000);

        // log the settings 
        console.log("settings.highlight: " + settings.highlight + " settings.searchbars: " + settings.searchbars + " settings.homepage: " + settings.homepage);
    }

    searchbarsRefresh() {
        this.focused_id = 0;
        this.search_fields = document.querySelectorAll('input[type=search]')
        this.text_fields = document.querySelectorAll("input[type=text]");
        this.all_input_fields = [...this.search_fields, ...this.text_fields];

        this.filtered_input_fields = this.all_input_fields.filter((element) => {
            return element.getBoundingClientRect().height > 0
                && element.getBoundingClientRect().width > 0
                && element.offsetParent !== null
                && !element.disabled
                && !element.readOnly
                && element.style.visibility !== "hidden" // filter out hidden elements 
                && element.style.display !== "none"; // filter out invisible elements
        });

        if (DEBUG) console.log(settings.highlight ? "highlighting" : "not highlighting");

        if (settings.highlight) {
            for (let i = 0; i < this.filtered_input_fields.length; i++) {
                if (i == 0) this.filtered_input_fields[i].style.border = "1px solid rgba(255, 0, 0, 0.2)";
                else this.text_fields[i].style.border = "1px solid green";
            }
        }
        else {
            for (let i = 0; i < this.filtered_input_fields.length; i++) {
                this.filtered_input_fields[i].style.border = "";
            }
        }

    }

    // Common listener for all keyboard shortcuts
    kbShortcutListener() {
        // save object reference
        var self = this;
        function eventHandler(event) {

            if (event.ctrlKey) {

                // searchbars feature
                if (settings.searchbars) {
                    if (event.key === ' ') {
                        if (self.filtered_input_fields.length > 0) {
                            self.filtered_input_fields[0].focus();
                            self.filtered_input_fields[0].select(); // select all text in searchbar 
                        }

                    }
                    else {
                        self.searchbarsRefresh();
                    }
                }

                // homepage feature, if CTRL + H is pressed, go to / homepage
                if (settings.homepage && event.key === 'h') {
                    window.location.href = "/";
                }
            }
        }
        document.addEventListener('keydown', eventHandler);
    }

    refresh_searchbars_listener_on_click() {
        // on click, refresh the search bars
        var self = this;
        document.addEventListener('click', function () {
            self.searchbarsRefresh();
            console.log("refreshed");
        }
        );
    }
}

var website_shortcuts = new WebsiteShortcuts(DEBUG);