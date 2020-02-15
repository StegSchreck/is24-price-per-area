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
}


// SEARCH RESULT PAGE /////////////////////////////////////////////////////////
function searchResultPageIsShown() {
  return window.location.pathname.startsWith('/Suche/');
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
  const itemPriceValueElement = resultListItemAttributes.querySelector('dl:first-child dd');
  const itemAreaValueElement = resultListItemAttributes.querySelector('dl:nth-child(2) dd');
  const price = extractValue(itemPriceValueElement);
  const area = extractValue(itemAreaValueElement);
  const pricePerArea = calculatePricePerArea(price, area);
  insertPricePerAreaToRegularItem(resultListItemAttributes, pricePerArea);
}

function handleHiddenItem(hiddenResultListItem) {
  const hiddenResultListItemAttributes = hiddenResultListItem.querySelector('.hidden-result__criteria');
  const itemPriceValueElement = hiddenResultListItemAttributes.querySelector('span:first-child');
  const itemAreaValueElement = hiddenResultListItemAttributes.querySelector('span:nth-child(2)');
  const price = extractValue(itemPriceValueElement);
  const area = extractValue(itemAreaValueElement);
  const pricePerArea = calculatePricePerArea(price, area);
  insertPricePerAreaToHiddenItem(hiddenResultListItemAttributes, pricePerArea);
}

function handleGroup(groupedResultListItem) {
  const groupItems = groupedResultListItem.getElementsByClassName('grouped-listing');
  for (const groupedItem of groupItems) {
    const groupedResultListItemAttributes = groupedItem.querySelector('div:nth-child(3)>a[data-go-to-expose-referrer="RESULT_LIST_LISTING"]');
    const itemPriceValueElement = groupedResultListItemAttributes.querySelector('.grouped-listing__criterion:nth-child(2)');
    const itemAreaValueElement = groupedResultListItemAttributes.querySelector('.grouped-listing__criterion:nth-child(3)');
    const price = extractValue(itemPriceValueElement);
    const area = extractValue(itemAreaValueElement);
    const pricePerArea = calculatePricePerArea(price, area);
    insertPricePerAreaToGroupedItem(groupedResultListItemAttributes, pricePerArea);
  }
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


// SHORTLIST PAGE /////////////////////////////////////////////////////////////
function shortlistPageIsShown() {
  return window.location.pathname.startsWith('/merkzettel/');
}

function analyseShortlistPage() {
  const shortlistItems = document.getElementsByClassName('shortlist-item');
  for (const shortlistItem of shortlistItems) {
    handleShortlistItem(shortlistItem);
  }
}

function handleShortlistItem(shortlistItem) {
  const shortlistItemAttributes = shortlistItem.querySelector('.criteria .content:not(.estimated-cost-widget)');
  const itemPriceValueElement = shortlistItemAttributes.querySelector('[data-qa="attr0-value"]');
  const itemAreaValueElement = shortlistItemAttributes.querySelector('[data-qa="attr2-value"]');
  const price = extractValue(itemPriceValueElement);
  const area = extractValue(itemAreaValueElement);
  const pricePerArea = calculatePricePerArea(price, area);
  insertPricePerAreaToShortlistItem(shortlistItemAttributes, pricePerArea);
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


// EXPOSE PAGE ////////////////////////////////////////////////////////////////
function exposePageIsShown() {
  return window.location.pathname.startsWith('/expose/');
}

function analyseExposePage() {
  const exposeItemAttributes = document.getElementsByClassName('main-criteria-container')[0];
  const itemPriceValueElement = exposeItemAttributes.querySelector('.is24qa-kaltmiete') || exposeItemAttributes.querySelector('.is24qa-kaufpreis');
  const itemAreaValueElement = exposeItemAttributes.querySelector('.is24qa-flaeche') || exposeItemAttributes.querySelector('.is24qa-wohnflaeche-ca');
  const price = extractValue(itemPriceValueElement);
  const area = extractValue(itemAreaValueElement);
  const pricePerArea = calculatePricePerArea(price, area);
  insertPricePerAreaToExposeItem(exposeItemAttributes, pricePerArea);
}

function insertPricePerAreaToExposeItem(exposeItemAttributes, pricePerArea) {
  const pricePerAreaText = convertPriceToText(pricePerArea);
  const pricePerAreaElement =
    `<div class="mainCriteria flex-item">
        <div class="is24-value font-semibold">${pricePerAreaText}</div>
        <div class="is24-label font-s">Grundpreis</div>
    </div>`;

  exposeItemAttributes.insertAdjacentHTML('beforeend', pricePerAreaElement);
}


// UTIL ///////////////////////////////////////////////////////////////////////
function calculatePricePerArea(price, area) {
  return (price / area).toFixed(2);
}

function extractValue(itemValueElement) {
  const itemValue = itemValueElement.textContent
    .replace('€', '')
    .replace('m²', '')
    .replace('.', '')
    .replace(',', '.')
    .trim();
  return parseFloat(itemValue);
}

function convertPriceToText(pricePerArea) {
  return pricePerArea.toString().replace('.', ',') + "  €/m²";
}
