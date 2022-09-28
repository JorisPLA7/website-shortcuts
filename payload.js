
const debug = true;
const highlight = true;
const feature_searchbars = true;

//select seqarch bars and open them on the associated keyboar shortcut.
class WebsiteShortcuts {
    constructor(debug = true, highlight_on_page_load = true, feature_searchbars = true) {
        this.debug = debug;
        this.highlight = highlight_on_page_load;
        this.feature_searchbars = feature_searchbars;

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

    kbShortcutListener() {
        // save object reference
        var self = this;
        function eventHandler(event) {

            // searchbars feature
            if (event.ctrlKey) {
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
var website_shortcuts = new WebsiteShortcuts(debug, highlight, feature_searchbars);