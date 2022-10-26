console.log("popup.js")

// class Settings {
//     constructor() {

//         // make it a singleton
//         if (Settings.instance) {
//             return Settings.instance;
//         }
//         else {
//             // throw error
//             throw new Error("Settings is a singleton. Use Settings.getInstance() to get the instance.");
//         }
        
//     }

//     // getters and setters
//     get highlight() {
//         return this._highlight;
//     }

//     set highlight(value) {
//         this._highlight = value;
//     this.update();
//     }

//     get searchbars() {
//         return this._searchbars;
//     }

//     set searchbars(value) {
//         this._searchbars = value;
//         this.update();
//     }

//     get homepage() {
//         return this._homepage;
//     }

//     set homepage(value) {
//         this._homepage = value;
//         this.update();
//     }

//     // listen to changes on the settings and update the local settings
//     listen() {
//         browser.storage.onChanged.addListener((changes, area) => {
//             if (area === "sync") {
//                 for (let key in changes) {
//                     this[key] = changes[key].newValue;
//                 }
//             }
//         });
//     }

//     // force read from storage
//     readStorage() {
//         browser.storage.sync.get().then((settings) => {
//             for (let key in settings) {
//                 this[key] = settings[key];
//             }
//         });
//     }

//     // write the settings to the browser sync storage on update
//     update() {
//         browser.storage.sync.set(this);
//     }

//     // call update() on each change
//     set(key, value) {
//         this[key] = value;
//         this.update();
//     }

// }

// function main() {
    
//     Settings.readStorage();
//     console.log("Settings : " + Settings.highlight, Settings.searchbars, Settings.homepage);

// }


// call main() when the 

// import { Settings } from "./settings.js";

// function logHighlight() {
//     console.log("popup.js: logHighlight()");
//     console.log(Settings.highlight + " " + Settings.searchbars + " " + Settings.homepage + " in popup.js");
// }

// logHighlight();

