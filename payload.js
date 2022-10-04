
const debug = true;
const highlight = true;
const feature_searchbars = true;
const feature_homepage = true;

//select seqarch bars and open them on the associated keyboar shortcut.
class WebsiteShortcuts {
    
    constructor(debug = true, highlight_on_page_load = true, feature_searchbars = true, feature_homepage = true) {
        this.debug = debug;
        this.highlight = highlight_on_page_load;
        this.feature_searchbars = feature_searchbars;
        this.feature_homepage = feature_homepage;

        this.refreshLoop();

        this.kbShortcutListener();
        // this.refresh_searchbars_listener_on_click();
    }

    refreshLoop() {
        this.searchbarsRefresh();
        setTimeout(this.refreshLoop.bind(this), 1000);
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
                && element.style.visibility !== "hidden" 
                && element.style.display !== "none"; // breaks office.com
        });

        if (this.highlight) {
            for (let i = 0; i < this.filtered_input_fields.length; i++) {
                if (i == 0) this.filtered_input_fields[i].style.border = "1px solid rgba(255, 0, 0, 0.2)";
                else this.text_fields[i].style.border = "1px solid green";
            }
        }

        if (this.debug) console.log(this.all_input_fields);
        if (this.debug) console.debug(this.filtered_input_fields);
        // inputs.push(document.querySelectorAll('input[type=text][name=search]'))
    }

    // Common listener for all keyboard shortcuts
    kbShortcutListener() {
        // save object reference
        var self = this;
        function eventHandler(event) {

            if (event.ctrlKey) {

                // searchbars feature
                if (self.feature_searchbars) {
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
                if (self.feature_homepage && event.key === 'h') {
                        window.location.href = "/";
                    }
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

var website_shortcuts = new WebsiteShortcuts(debug, highlight, feature_searchbars, feature_homepage);