'use strict';

let resultListItems = document.getElementsByTagName("article");

for (const resultListItem of resultListItems) {
  if (resultListItem.classList.contains("result-list-entry--project") ||
    resultListItem.classList.contains("hidden-result")) {
    continue;
  }
  const resultListItemAttributes = resultListItem.querySelector('[data-is24-qa="attributes"]');
  const price = extractPrice(resultListItemAttributes);
  const area = extractArea(resultListItemAttributes);
  const pricePerArea = (price / area).toFixed(2);
  setTimeout(function(){ insertPricePerArea(resultListItemAttributes, pricePerArea)}, 2000);

}

function extractPrice(resultListItemAttributes) {
  const resultListItemPriceElement = resultListItemAttributes.querySelector('dl:first-child dd');
  const resultListItemPrice = resultListItemPriceElement.textContent
    .replace("€", "")
    .replace(".", "")
    .replace(",", ".")
    .trim();
  return parseFloat(resultListItemPrice);
}

function extractArea(resultListItemAttributes) {
  const resultListItemAreaElement = resultListItemAttributes.querySelector('dl:nth-child(2) dd');
  const resultListItemArea = resultListItemAreaElement.textContent
    .replace("m²", "")
    .replace(".", "")
    .replace(",", ".")
    .trim();
  return parseFloat(resultListItemArea);
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
