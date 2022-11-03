
const DEBUG = false;

// ternary operator to set browser to chrome or browser
var browser = (typeof browser === "undefined") ? chrome : browser;

// wrapper to read and write the settings on the browser sync storage

class Settings {
    constructor() {
        this.readStorage();

        function delayed(self) {
            if (DEBUG) {
                console.log("Read from storage : hl: " + settings.highlight + " sb: " + settings.searchbars + " hp: " + settings.homepage);
            }
            if (self._highlight === undefined) {
                self._highlight = true;
                console.log("Highlight feature setting not found in storage, setting to true");
            }
            if (self._searchbars === undefined) {
                self._searchbars = true;
                console.log("Searchbars feature setting not found in storage, setting to true");
            }
            if (self._homepage === undefined) {
                self._homepage = true;
                console.log("Homepage feature setting not found in storage, setting to true");
            }
            self.pushToStorage();
        }
        // wait for the storage to be read, should be replaced by a promise for better code quality
        setTimeout(delayed(this), 10);

        this.listenToStorageChanges();
    }

    // getters and setters
    // setters are not meant to be used from this script
    // if setters had to be used, they should call pushToStorage() after setting the value
    // see popup.js for an example
    get highlight() {
        // this.readStorage();
        return this._highlight;
    }
    get searchbars() {
        // this.readStorage();
        return this._searchbars;
    }
    get homepage() {
        // this.readStorage();
        return this._homepage;
    }

    // listen to changes on the settings and update the sync settings
    listenToStorageChanges() {
        browser.storage.onChanged.addListener((changes, area) => {
            if (area === "sync") {
                // log a message in bold red 
                for (let key in changes) {
                    this[key] = changes[key].newValue;

                    if (DEBUG && changes[key].oldValue !== changes[key].newValue) {
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
        // catch error if browser is not defined
        
        try {
        browser.storage.sync.get().then((result) => {
            for (let key in result) {
                this[key] = result[key];
            }
        });
        } catch (e) {
            console.log("Error while reading storage");
        }
        
    }

}
// create a new Settings object
var settings = new Settings();

//select search bars and open them on the associated keyboar shortcut.
class WebsiteShortcuts {

    constructor() {
        this.refreshLoop();
        this.kbShortcutListener();
    }

    refreshLoop() {
        this.searchbarsRefresh();
        setTimeout(this.refreshLoop.bind(this), 1000);
    }

    searchbarsRefresh() {
        this.focused_id = 0;
        // We can't use CSS selectors "input[type=text], input[type=search]" for this because an input without type
        // defaults to type "text". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
        this.all_input_fields = [ ...document.querySelectorAll("input")].filter(e => e.type === "text" || e.type === "search")

        this.filtered_input_fields = this.all_input_fields.filter((element) => {
            return element.getBoundingClientRect().height > 0 && element.getBoundingClientRect().width > 0 && element.offsetParent !== null && !element.disabled && !element.readOnly && element.style.visibility !== "hidden"; // filter out hidden elements  && element.style.display !== "none"; // filter out invisible elements
        });

        if (DEBUG) console.log(settings.highlight ? "highlighting" : "not highlighting");

        if (settings.highlight) {
            for (let i = 0; i < this.filtered_input_fields.length; i++) {
                if (i == 0) {
                    this.filtered_input_fields[i].style.border = "2px solid rgba(255, 0, 0, 0.25)";
                    this.filtered_input_fields[i].style.borderRadius = "5px";
                }
                else this.all_input_fields[i].style.border = "1px solid green";
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
                            self.filtered_input_fields[0].setSelectionRange(self.filtered_input_fields[0].value.length, self.filtered_input_fields[0].value.length);
                        }
                    }
                    else {
                        self.searchbarsRefresh();
                    }
                }

                // homepage feature
                if (settings.homepage && event.key === 'h') {
                    // TODO keep the region in the url
                    window.location.href = "/";
                }
            }
        }
        document.addEventListener('keydown', eventHandler);
    }

    refresh_searchbars_listener_on_click() {
        // on click, refresh the search bars
        // so, opening a new menu showing a potential search bar will highlight it instantly
        var self = this;
        document.addEventListener('click', function () {
            self.searchbarsRefresh();
            console.log("refreshed");
        }
        );
    }
}

var website_shortcuts = new WebsiteShortcuts();
