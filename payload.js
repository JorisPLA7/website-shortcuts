//document.body.style.border = "2px solid red";

function  focus_search() {
	var inputs = document.querySelectorAll('input[type=search]')

	var x = document.querySelectorAll("a[target=_blank][id=coucou]");
	inputs.push(document.querySelectorAll('input[type=text][name=search]'))
	
	inputs[0].focus()
}

document.addEventListener('keydown', function (event) {
	// CTRL + Space combo
	if (event.ctrlKey && event.key === ' ') {
		focus_search();
  	}
});
