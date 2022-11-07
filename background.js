function reachHomepage() {
    window.location.href = "/";
}

chrome.commands.onCommand.addListener((command, tab) => {

    // console.log(`Command "${command}" triggered`);
    
    if (!tab.url.includes("chrome://")) {

        if (command === "reach_homepage") {
            // No tabs or host permissions needed!
            if (!tab.url.includes("chrome://")) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: reachHomepage
                });
            }
        }

        if (command === "searchbar_focus") {
            // trigger the searchbar() function in the content script 
            console.log("searchbar_focus triggered");
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: myAlert
            });
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content-script.js'],
            });

        }
    }
});
