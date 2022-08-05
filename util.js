'use strict';

function calculatePricePerArea(price, area) {
  return (price / area).toFixed(2);
}

function extractValue(itemValueElement) {
  const itemValue = itemValueElement.textContent
    .replace('€/m²', '')
    .replace('€', '')
    .replace('m²', '')
    .replaceAll('.', '')
    .replace(',', '.')
    .trim();
  return parseFloat(itemValue);
}

function convertPriceToText(pricePerArea) {
  return pricePerArea.toString().replace('.', ',') + "  €/m²";
}

function applyColorClassOnAllItems() {
  const pricePerAreaElements = document.getElementsByClassName('x-pricePerArea');
  for (const pricePerAreaElement of pricePerAreaElements) {
    const pricePerArea = extractValue(pricePerAreaElement);
    applyColorClass(pricePerAreaElement, pricePerArea);
  }
}

function applyColorClass(pricePerAreaElement, pricePerArea) {
  chrome.storage.sync.get({
    colorHighlightFeatureToggle: true,
    colorHighlightMethodToggle: true,
    colorHighlightLow: 10,
    colorHighlightHigh: 15
  }, (items) => {
    if (!items.colorHighlightFeatureToggle) {
      pricePerAreaElement.style.backgroundColor = 'transparent';
      pricePerAreaElement.style.color = 'inherit';
      pricePerAreaElement.style.paddingLeft = '0';
      pricePerAreaElement.style.paddingRight = '0';
      return
    }

    let highlightColor = 'orange';
    if (pricePerArea < parseFloat(items.colorHighlightLow)) {
      highlightColor = 'green';
    } else if (pricePerArea > parseFloat(items.colorHighlightHigh)) {
      highlightColor = 'red';
    }

    if (items.colorHighlightMethodToggle) {
      pricePerAreaElement.style.backgroundColor = highlightColor;
      pricePerAreaElement.style.color = 'white';
      pricePerAreaElement.style.paddingLeft = '0.2em';
      pricePerAreaElement.style.paddingRight = '0.2em';
    } else {
      pricePerAreaElement.style.backgroundColor = 'transparent';
      pricePerAreaElement.style.color = highlightColor;
      pricePerAreaElement.style.paddingLeft = '0';
      pricePerAreaElement.style.paddingRight = '0';
    }
  });
}

chrome.storage.onChanged.addListener((changes, namespace) => {
  applyColorClassOnAllItems();
});

