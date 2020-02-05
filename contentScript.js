'use strict';

const resultListItems = document.getElementsByTagName('article');

const itemAttributesSelector = '[data-is24-qa="attributes"]';
const priceElementSelector = 'dl:first-child dd';
const areaElementSelector = 'dl:nth-child(2) dd';

const hiddenItemAttributesSelector = '.hidden-result__criteria';
const hiddenPriceElementSelector = 'span:first-child';
const hiddenAreaElementSelector = 'span:nth-child(2)';


setTimeout(function() { handleItems(); }, 3000);

function handleItems() {
  for (const resultListItem of resultListItems) {
    if (isGroupedProject(resultListItem)) {
      continue;
    }
    if (isHiddenItem(resultListItem)) {
      handleHiddenItem(resultListItem);
      continue;
    }
    handleRegularItem(resultListItem);
  }
}

function isGroupedProject(resultListItem) {
  return resultListItem.classList.contains('result-list-entry--project');
}

function isHiddenItem(resultListItem) {
  return resultListItem.classList.contains('hidden-result');
}

function handleRegularItem(resultListItem) {
  const resultListItemAttributes = resultListItem.querySelector(itemAttributesSelector);
  const price = extractValue(resultListItemAttributes, priceElementSelector);
  const area = extractValue(resultListItemAttributes, areaElementSelector);
  const pricePerArea = calculatePricePerArea(price, area);
  insertPricePerAreaToRegularItem(resultListItemAttributes, pricePerArea);
}

function extractValue(resultListItemAttributes, selector) {
  const resultListItemValueElement = resultListItemAttributes.querySelector(selector);
  const resultListItemValue = resultListItemValueElement.textContent
    .replace('€', '')
    .replace('m²', '')
    .replace('.', '')
    .replace(',', '.')
    .trim();
  return parseFloat(resultListItemValue);
}

function handleHiddenItem(resultListItem) {
  const hiddenResultListItemAttributes = resultListItem.querySelector(hiddenItemAttributesSelector);
  const price = extractValue(hiddenResultListItemAttributes, hiddenPriceElementSelector);
  const area = extractValue(hiddenResultListItemAttributes, hiddenAreaElementSelector);
  const pricePerArea = calculatePricePerArea(price, area);
  insertPricePerAreaToHiddenItem(hiddenResultListItemAttributes, pricePerArea);
}

function calculatePricePerArea(price, area) {
  return (price / area).toFixed(2);
}

function convertPriceToText(pricePerArea) {
  return pricePerArea.toString().replace('.', ',') + "  €/m²";
}
function insertPricePerAreaToRegularItem(resultListItemAttributes, pricePerArea) {
  const pricePerAreaText = convertPriceToText(pricePerArea);
  const pricePerAreaElement =
    `<dl class="grid-item result-list-entry__primary-criterion" role="presentation">
    <dd class="font-nowrap font-line-xs">${pricePerAreaText}</dd>
    <dt class="font-s onlyLarge">Grundpreis</dt>
    </dl>`;

  resultListItemAttributes.insertAdjacentHTML('beforeend', pricePerAreaElement);
}

function insertPricePerAreaToHiddenItem(resultListItemAttributes, pricePerArea) {
  const pricePerAreaText = convertPriceToText(pricePerArea);
  const pricePerAreaElement =
    `<span class="hidden-result__value inline-block">${pricePerAreaText}</span>`;

  resultListItemAttributes.insertAdjacentHTML('beforeend', pricePerAreaElement);
}

