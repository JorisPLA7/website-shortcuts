var debug = true;
var highlight = true;

//select seqarch bars and open them on the associated keyboar shortcut.
class Searchbars {
    constructor(debug, highlight) {
        this.debug = debug;
        this.highlight = highlight;
        this.focused_id = 0

        //populate all_input_fields with relevant input fields
        this.search_fields = document.querySelectorAll('input[type=search]')
        this.text_fields = document.querySelectorAll("input[type=text]");
        this.all_input_fields = [...this.search_fields, ...this.text_fields];

        if (this.debug == true) {
            console.log("all_input_fileds : + ", this.all_input_fields);
        }

        //highlight input fields in color depending on type & rank
        for (let i = 0; i < this.search_fields.length; i++) {
            this.search_fields[i].style.border = "1px solid blue";
        }
        for (let i = 0; i < this.text_fields.length; i++) {
            this.text_fields[i].style.border = "1px solid green";
        }

        console.log(this.all_input_fields);
        // inputs.push(document.querySelectorAll('input[type=text][name=search]'))

        if (this.all_input_fields.length >= 1) {
            this.all_input_fields[0].style.border = "1px solid red";
        }
    }

    focus_search() {
        this.all_input_fields[0].focus()
        // inputs[focused_id].focus()
        // console.log("focus_search " + focused_id)
        // focused_id++
    }

    add_event_listener() {
        // save object reference
        var self = this;
        function eventHandler(event) {
            // get attributes of the calling 
            // console.log("Event : keydown");
            if (event.ctrlKey && event.key === ' ') {
                self.debug = self.highlight;
                console.log("lenght : " + self.all_input_fields.length);
                self.all_input_fields[0].focus();
                console.log("Event : CTRL + SPACE");
            }
        }

        document.addEventListener('keydown', eventHandler); 
    }
}
console.log("searchbars class loaded");
var searchbars = new Searchbars(debug, highlight);
console.log("searchbars : ", searchbars);
searchbars.add_event_listener();
console.log("key listener added");