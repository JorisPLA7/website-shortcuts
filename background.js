const DEBUG = false;
var browser = (typeof browser === "undefined") ? chrome : browser;

browser.commands.onCommand.addListener((command, tab) => {
    if (!tab.url.includes("chrome://")) {
        browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            // commands are defined in manifest.json
            browser.tabs.sendMessage(tabs[0].id, { action: command }, function (response) {
                if (DEBUG) console.log(response);
            });
        });
    }
});
