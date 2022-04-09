// ==UserScript==
// @name         Search KB Shortcut
// @namespace    https://github.com/JorisPLA7/searchbar-shortcut
// @version      0.1
// @description  Binds ctrl + space to the website's search bar.
// @author       Joris P
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function () {
    //    'use strict';

    //find input fields
    var search_fields = document.querySelectorAll('input[type=search]')
    var text_fields = document.querySelectorAll("input[type=text]");
    var all_input_fields = [...search_fields, ...text_fields];
    console.log("all_input_fields : + ", all_input_fields);

    var nb_fields = all_input_fields.length;

    //highlight input fields in color depending on type & rank
    for (let i = 0; i < search_fields.length; i++) {
        search_fields[i].style.border = "1px solid blue";
    }
    for (let i = 0; i < text_fields.length; i++) {
        text_fields[i].style.border = "1px solid rgba(0, 255, 0, 0.5)";
        // x[i].style.color = "blue"
    }

    // console.log(all_input_fields);
    // inputs.push(document.querySelectorAll('input[type=text][name=search]'))

    if (all_input_fields.length >= 1) {
        all_input_fields[0].style.border = "1px solid rgba(255, 0, 0, 0.5)";
    }

    var focused_id = 0

    function focus_search() {
        if (typeof focus_search.focused == 'undefined') { focus_search.focused = 0; }

        all_input_fields[focus_search.focused].focus();
        console.log("focus_search.focused : ", focus_search.focused);

        focus_search.focused = (focus_search.focused + 1) % nb_fields;
    }


    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.key === ' ') {
            focus_search();
        }
    })
})();

