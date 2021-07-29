//find input fields
var search_fields = document.querySelectorAll('input[type=search]')
var text_fields = document.querySelectorAll("input[type=text]");
var all_input_fileds = [...search_fields, ...text_fields];
console.log("all_input_fileds : + ", all_input_fileds);

//highlight input fields in color depending on type & rank
for (let i = 0; i < search_fields.length; i++) {
    search_fields[i].style.border = "1px solid blue";
}
for (let i = 0; i < text_fields.length; i++) {
    text_fields[i].style.border = "1px solid green";
    // x[i].style.color = "blue"
}

// console.log(all_input_fileds);
// inputs.push(document.querySelectorAll('input[type=text][name=search]'))

if (all_input_fileds.length >= 1) {
    all_input_fileds[0].style.border = "1px solid red";
}

var focused_id = 0

function focus_search() {
    all_input_fileds[0].focus()
        // inputs[focused_id].focus()
        // console.log("focus_search " + focused_id)
        // focused_id++
}

document.addEventListener('keydown', function(event) {
    // console.log("Event : keydown");
    if (event.ctrlKey && event.key === ' ') {
        focus_search();
        console.log("Event : CTRL + SPACE");

    }
})