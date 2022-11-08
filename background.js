const DEBUG = false;

function reachHomepage() {
    window.location.href = "/";
}

chrome.commands.onCommand.addListener((command, tab) => {

    // console.log(`Command "${command}" triggered`);

    if (!tab.url.includes("chrome://")) {

        // trigger the searchbar() function in the content script 
        if (DEBUG) console.log("command triggered" + command);

        // try
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            // commands are defined in manifest.json
            chrome.tabs.sendMessage(tabs[0].id, { action: command }, function (response) {
                // if (!response.success) {
                //     console.log("error : " + response.error);
                // }
                if (DEBUG) console.log(response);
            });
        });

        // // check last error
        // if (chrome.runtime.lastError) {
        //     console.log(chrome.runtime.lastError.message);
        // }

    }
});
