'use strict';

const resultListItems = document.getElementsByTagName("article");
const priceElementSelector = 'dl:first-child dd';
const areaElementSelector = 'dl:nth-child(2) dd';

for (const resultListItem of resultListItems) {
  if (resultListItem.classList.contains("result-list-entry--project") ||
    resultListItem.classList.contains("hidden-result")) {
    continue;
  }
  const resultListItemAttributes = resultListItem.querySelector('[data-is24-qa="attributes"]');
  const price = extractValue(resultListItemAttributes, priceElementSelector);
  const area = extractValue(resultListItemAttributes, areaElementSelector);
  const pricePerArea = (price / area).toFixed(2);
  setTimeout(function(){ insertPricePerArea(resultListItemAttributes, pricePerArea)}, 2000);
}

function extractValue(resultListItemAttributes, selector) {
  const resultListItemValueElement = resultListItemAttributes.querySelector(selector);
  const resultListItemValue = resultListItemValueElement.textContent
    .replace("€", "")
    .replace("m²", "")
    .replace(".", "")
    .replace(",", ".")
    .trim();
  return parseFloat(resultListItemValue);
}

function insertPricePerArea(resultListItemAttributes, pricePerArea) {
  const pricePerAreaText = pricePerArea.toString().replace(".", ",");
  const pricePerAreaElement =
    `<dl class="grid-item result-list-entry__primary-criterion " role="presentation">
    <dd class="font-nowrap font-line-xs">${pricePerAreaText} €/m²</dd>
    <dt class="font-s onlyLarge">Grundpreis</dt>
    </dl>`;

  resultListItemAttributes.insertAdjacentHTML('beforeend', pricePerAreaElement);
}
