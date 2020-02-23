<p align="center">
  <img src="https://raw.githubusercontent.com/StegSchreck/is24-price-per-area/master/images/icon_128.png" width="128px">
</p>

# IS24 Price Per Area
Chrome Extension for showing the price per m² on the search result pages, the shortlist page, and the expose pages of ImmobilienScout24.

This extension is designed to only be active on `https://*.immobilienscout24.de`.

The implementation details of ImmobilienScout24 make it necessary to include a 2 seconds delay before displaying the price per area value.

While being on ImmobilienScout24, you can choose to highlight the calculated price per area with colors. To configure the style of highlighting and the thresholds, just click on the icon of the extension in the Chrome menu. In the popup that will open, you can adjust the settings.

## Installation
Currently, this extension is not listed on the official Chrome Web Store.

To use this extension, please follow the following steps:
1. clone this repository
2. open this url in a new Chrome tab: `chrome://extensions/`
3. in the top-right corner click the switch to enable to the "Developer mode"
4. a new menu bar appeared, where you can find the button "Load unpacked", which you need to click
5. in the file dialog that just opened, navigate to the directory of the cloned repository and click "Open"

### Disclaimer
This project is not affiliated with ImmobilienScout24 in any way. There is no guarantee or reliability that I provide.
