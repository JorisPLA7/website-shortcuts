const DEBUG = false;
// ternary operator to set browser to chrome or browser
var browser = (typeof browser === "undefined") ? chrome : browser;

browser.storage.sync.get("initialized").then((result) => {
    if (result.initialized === undefined) {
        // supposed to be only triggered once, at install
        browser.storage.sync.set({
            highlight: true,
            searchbars: true,
            homepage: true,
            initialized: true
        });
    }
    if (DEBUG) console.log("Storage values initialized");
});
if (DEBUG) console.log(browser.storage.sync.get());

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
        this.search_fields = document.querySelectorAll('input[type=search]');
        this.text_fields = document.querySelectorAll("input[type=text]");
        this.no_explicit_type_fields = document.querySelectorAll("input:not([type])");
        this.all_input_fields = [...this.search_fields, ...this.text_fields, ...this.no_explicit_type_fields];

        this.filtered_input_fields = this.all_input_fields.filter((element) => {
            // filter out hidden elements  && element.style.display !== "none"; // filter out invisible elements
            return element.getBoundingClientRect().height > 0 && element.getBoundingClientRect().width > 0 && element.offsetParent !== null && !element.disabled && !element.readOnly && element.style.visibility !== "hidden";
        });

        // TODO fix Uncaught Error: Extension context invalidated.
        try {
            browser.storage.sync.get("highlight", (result) => {
                if (result.highlight) {
                    this.filtered_input_fields.forEach((element) => {
                        element.style.outline = "2px solid rgba(255, 0, 0, 0.25)";
                        element.style.outlineRadius = "5px";
                    });
                }
                else {
                    for (let i = 0; i < this.filtered_input_fields.length; i++) {
                        this.filtered_input_fields[i].style.outline = "none";
                    }
                }

            });
        }
        catch (e) {
            if (DEBUG) console.log(e);
        }
    }

    searchbarSelect() {
        browser.storage.sync.get("searchbars", (result) => {
            if (result.searchbars) {
                if (this.filtered_input_fields.length > 0) {
                    this.filtered_input_fields[0].focus();
                    this.filtered_input_fields[0].setSelectionRange(this.filtered_input_fields[0].value.length, this.filtered_input_fields[0].value.length);
                }
            }
        });
    }

    reachHomepage() {
        browser.storage.sync.get("homepage", (result) => {
            if (result.homepage) {
                window.location.href = "/";
            }
        });
    }

    // to be sure that the search bar is highlighted when the user hits Ctrl
    kbShortcutListener() {
        // save object reference
        var self = this;
        function eventHandler(event) {

            // if only ctrl is pressed, refresh the search bars
            if (event.ctrlKey) {
                self.searchbarsRefresh();
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
        });
    }
}

// signle instance of the class
var website_shortcuts = new WebsiteShortcuts();

// listen for messages from background.js
browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (DEBUG) {
            console.log("message received : " + request.action);
            browser.storage.sync.get().then((result) => { console.log(result); });
        }

        if (request.action === "searchbar_focus") {
            website_shortcuts.searchbarSelect();
        }
        else if (request.action === "reach_homepage") {
            website_shortcuts.reachHomepage();
        }
        else {
            // send bad response
            sendResponse({ error: "unknown action", success: false });
        }
        sendResponse({ success: true });
    }
);

if (DEBUG) {
    console.log("payload.js ended");
    // browser.storage.sync.get().then((result) => { console.log(result); });
}