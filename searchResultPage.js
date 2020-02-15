'use strict';

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
