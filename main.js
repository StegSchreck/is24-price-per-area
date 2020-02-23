'use strict';

setTimeout(function() { main(); }, 2000);

function main() {
  if (searchResultPageIsShown()) {
    analyseSearchResultPage();
  }
  if (shortlistPageIsShown()) {
    analyseShortlistPage();
  }
  if (exposePageIsShown()) {
    analyseExposePage();
  }
  applyColorClassOnAllItems();
}
