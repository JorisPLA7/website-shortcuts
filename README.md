# Website Shortcut
Browser extension to add an unique keyboard shortcut to open some webpage elements, like the searchbar or the login page/form.

- `Ctrl + Space` to open the searchbar
- `Ctrl + H` to open the homepage

# Next ideas to implement

- [ ] update the UI 
    - [ ] separate webflow and custom css
    - [ ] replace the shortcuts with an edit link to the extensions shortcut edit page
        - Firefox: `about:addons > Extensions > Manage Extension Shortcuts`
        - Chrome: `chrome://extensions/shortcuts`
- `Ctrl + L` to open the login page/form
- [ ] Verify command registered on action popup load : `https://developer.chrome.com/docs/extensions/reference/commands/#verify-commands-registered`
- [ ] support localized homepages such as `https://www.example.com/fr/` or `https://www.example.com/en/`
- [ ] enable focus search bars hidden behind a menu button.
- [ ] make it work with login forms hidden behind a login button.
- [ ] Fix existing searbar border destruction when the extension is turned off
