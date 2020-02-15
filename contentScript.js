'use strict';

setTimeout(function() { main(); }, 2000);

function main() {
  if (onShortlist()) {
    analyseShortlistPage();
  }
  if (onSearchResultPage()) {
    analyseSearchResultPage();
  }
  if (onExpose()) {
    handleExpose();
  }
}

function onShortlist() {
  return window.location.pathname.startsWith('/merkzettel/');
}

function onSearchResultPage() {
  return window.location.pathname.startsWith('/Suche/');
}

function onExpose() {
  return window.location.pathname.startsWith('/expose/');
}

function analyseShortlistPage() {
  const shortlistItems = document.getElementsByClassName('shortlist-item');
  for (const shortlistItem of shortlistItems) {
    handleShortlistItem(shortlistItem);
  }
}

function analyseSearchResultPage() {
  const resultListItems = document.getElementsByTagName('article');
  for (const resultListItem of resultListItems) {
    if (isGroupedProject(resultListItem)) {
      handleGroup(resultListItem);
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
  const resultListItemAttributes = resultListItem.querySelector('[data-is24-qa="attributes"]');
  const price = extractValue(resultListItemAttributes, 'dl:first-child dd');
  const area = extractValue(resultListItemAttributes, 'dl:nth-child(2) dd');
  const pricePerArea = calculatePricePerArea(price, area);
  insertPricePerAreaToRegularItem(resultListItemAttributes, pricePerArea);
}

function handleHiddenItem(hiddenResultListItem) {
  const hiddenResultListItemAttributes = hiddenResultListItem.querySelector('.hidden-result__criteria');
  const price = extractValue(hiddenResultListItemAttributes, 'span:first-child');
  const area = extractValue(hiddenResultListItemAttributes, 'span:nth-child(2)');
  const pricePerArea = calculatePricePerArea(price, area);
  insertPricePerAreaToHiddenItem(hiddenResultListItemAttributes, pricePerArea);
}

function handleGroup(groupedResultListItem) {
  const groupItems = groupedResultListItem.getElementsByClassName('grouped-listing');
  for (const groupedItem of groupItems) {
    const groupedResultListItemAttributes = groupedItem.querySelector('div:nth-child(3)>a[data-go-to-expose-referrer="RESULT_LIST_LISTING"]');
    const price = extractValue(groupedResultListItemAttributes, '.grouped-listing__criterion:nth-child(2)');
    const area = extractValue(groupedResultListItemAttributes, '.grouped-listing__criterion:nth-child(3)');
    const pricePerArea = calculatePricePerArea(price, area);
    insertPricePerAreaToGroupedItem(groupedResultListItemAttributes, pricePerArea);
  }
}

function handleShortlistItem(shortlistItem) {
  const shortlistItemAttributes = shortlistItem.querySelector('.criteria .content:not(.estimated-cost-widget)');
  const price = extractValue(shortlistItemAttributes, '[data-qa="attr0-value"]');
  const area = extractValue(shortlistItemAttributes, '[data-qa="attr2-value"]');
  const pricePerArea = calculatePricePerArea(price, area);
  insertPricePerAreaToShortlistItem(shortlistItemAttributes, pricePerArea);
}

function handleExpose() {
  const exposeItemAttributes = document.getElementsByClassName('main-criteria-container')[0];
  const price = extractValue(exposeItemAttributes, '.is24qa-kaltmiete');
  const area = extractValue(exposeItemAttributes, '.is24qa-flaeche');
  const pricePerArea = calculatePricePerArea(price, area);
  insertPricePerAreaToExpose(exposeItemAttributes, pricePerArea);
}

function calculatePricePerArea(price, area) {
  return (price / area).toFixed(2);
}

function extractValue(itemAttributesElement, selector) {
  const itemValueElement = itemAttributesElement.querySelector(selector);
  const itemValue = itemValueElement.textContent
    .replace('€', '')
    .replace('m²', '')
    .replace('.', '')
    .replace(',', '.')
    .trim();
  return parseFloat(itemValue);
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

function insertPricePerAreaToHiddenItem(hiddenResultListItemAttributes, pricePerArea) {
  const pricePerAreaText = convertPriceToText(pricePerArea);
  const pricePerAreaElement =
    `<span class="hidden-result__value inline-block">${pricePerAreaText}</span>`;

  hiddenResultListItemAttributes.insertAdjacentHTML('beforeend', pricePerAreaElement);
}

function insertPricePerAreaToGroupedItem(groupedResultListItemAttributes, pricePerArea) {
  const pricePerAreaText = convertPriceToText(pricePerArea);
  const pricePerAreaElement =
    `<span class="grouped-listing__criterion font-nowrap">${pricePerAreaText}</span>`;

  groupedResultListItemAttributes.insertAdjacentHTML('beforeend', pricePerAreaElement);
}

function insertPricePerAreaToShortlistItem(shortlistItemAttributes, pricePerArea) {
  const pricePerAreaText = convertPriceToText(pricePerArea);
  const pricePerAreaElement =
    `<div id="attr3-115695498" class="grid padding-vertical-s border-top">
        <div data-qa="attr3-label" class="grid-item five-tenths font-ellipsis">Grundpreis</div>
        <div data-qa="attr2-value" class="grid-item five-tenths font-ellipsis align-right">${pricePerAreaText}</div>
    </div>`;

  shortlistItemAttributes.insertAdjacentHTML('beforeend', pricePerAreaElement);
}

function insertPricePerAreaToExpose(exposeItemAttributes, pricePerArea) {
  const pricePerAreaText = convertPriceToText(pricePerArea);
  const pricePerAreaElement =
    `<div class="mainCriteria flex-item">
        <div class="is24-value font-semibold">${pricePerAreaText}</div>
        <div class="is24-label font-s">Grundpreis</div>
    </div>`;

  exposeItemAttributes.insertAdjacentHTML('beforeend', pricePerAreaElement);
}

function convertPriceToText(pricePerArea) {
  return pricePerArea.toString().replace('.', ',') + "  €/m²";
}
