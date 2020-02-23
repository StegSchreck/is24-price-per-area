'use strict';

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
        <div data-qa="attr2-value" class="grid-item five-tenths font-ellipsis align-right x-pricePerArea">${pricePerAreaText}</div>
    </div>`;

  shortlistItemAttributes.insertAdjacentHTML('beforeend', pricePerAreaElement);
}
