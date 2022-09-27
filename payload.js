var debug = true;
var highlight = true;
var feature_searchbars = true;
//select seqarch bars and open them on the associated keyboar shortcut.
class WebsiteShortcuts {
    constructor(debug = false, highlight = false, feature_searchbars = true) {
        this.debug = debug;
        this.highlight = highlight;
        this.feature_searchbars = feature_searchbars;

        //setup each feature
        this.searchbars_setup();
        // this.

        this.kb_shortcut_listener();
        // this.refresh_searchbars_listener_on_click();
    }

    searchbars_setup() {
        this.focused_id = 0;


        //populate all_input_fields with potentially usable search bars

        this.search_fields = document.querySelectorAll('input[type=search]')
        this.text_fields = document.querySelectorAll("input[type=text]");
        this.all_input_fields = [...this.search_fields, ...this.text_fields];

        // border green all input fields

        // sort out the search bars that are not usable by the user
        // var criterias = [ function height_is_below_0(element) {
        //     return element.getBoundingClientRect().height < 0;
        // },
        // function width_is_below_0() {
        //     return this.getBoundingClientRect().width < 0;
        // },

        // function is_hidden() {
        //     return this.offsetParent === null;
        // },
        // function is_disabled() {
        //     return this.disabled;
        // },
        // function is_readonly() {
        //     return this.readOnly;
        // },
        // function is_not_visible() {
        //     return this.style.visibility === "hidden";
        // },
        // function is_not_displayed() {
        //     return this.style.display === "none";
        // },

        // ]; 

        // this.filtered_input_fields = this.all_input_fields;
        // for (var j = 0; j < criterias.length; j++) {
        //     this.filtered_input_fields = this.filtered_input_fields.filter(criterias[j]);
        // }

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

    kb_shortcut_listener() {
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
                    self.searchbars_setup();
                }
            }
        }

        document.addEventListener('keydown', eventHandler);
    }

    refresh_searchbars_listener_on_click() {
        // on click, refresh the search bars
        var self = this;
        document.addEventListener('click', function () {
            self.searchbars_setup();
            console.log("refreshed");
        }
        );
    }
}
// if (this.debug) console.debug("searchbars class loaded");
var website_shortcuts = new WebsiteShortcuts(debug, highlight, feature_searchbars);
// if (this.debug) console.debug("searchbars : ", website_shortcuts);

function test() {
    console.log("test");
}

// trigger test at the very end of the page loading
document.addEventListener('DOMContentLoaded', function () {
    test();
}
);


