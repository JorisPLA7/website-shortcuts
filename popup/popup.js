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
}).then(() => {
    if (DEBUG) console.log(browser.storage.sync.get());

    // hide irrelevant browser related content
    if (typeof chrome === "undefined") {
        document.querySelectorAll(".firefox-only").forEach((element) => {
            element.style.display = "none";
        });
    }
    else {
        document.querySelectorAll(".chromium-only").forEach((element) => {
            element.style.display = "none";
        });
    }

    // select all the elements matching the toggle class
    const toggleSwitches = document.querySelectorAll(".toggle");

    if (DEBUG) {
        // for each toggle switch, log the associated value from storage
        toggleSwitches.forEach((toggleSwitch) => {
            browser.storage.sync.get(toggleSwitch.id, (result) => {
                console.log(toggleSwitch.id + " : " + result[toggleSwitch.id]);
            });
        });
        console.log("test");
        browser.storage.sync.get("initialized", (result) => { console.log(result); });
        browser.storage.sync.get().then((result) => { console.log(result); });
    }

    // initialize the toggle switches "toggle-ON" class based on the settings
    toggleSwitches.forEach((toggleSwitch) => {
        browser.storage.sync.get(toggleSwitch.id, (result) => {
            if (result[toggleSwitch.id] === undefined) {
                console.error("Undefined toggleSwitch id : " + toggleSwitch.id);
            }
            else {
                if (result[toggleSwitch.id]) {
                    toggleSwitch.classList.add("toggle-ON");
                } else {
                    toggleSwitch.classList.remove("toggle-ON");
                }
            }

        });
    });

    // add a click event listener to all the toggle switches
    // when clicked, toggle the "toggle-ON" class and update the associated setting
    toggleSwitches.forEach((toggleSwitch) => {
        toggleSwitch.addEventListener("click", () => {
            toggleSwitch.classList.toggle("toggle-ON");
            browser.storage.sync.set({ [toggleSwitch.id]: toggleSwitch.classList.contains("toggle-ON") }, () => {
                if (DEBUG) console.log(toggleSwitch.id + " changed to " + toggleSwitch.classList.contains("toggle-ON"));
            });
            //log new values
            browser.storage.sync.get().then((result) => {
                if (DEBUG) console.log(result);
            }
            );
        });
    });

});