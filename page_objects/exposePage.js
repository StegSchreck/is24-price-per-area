'use strict';

function exposePageIsShown() {
  return window.location.pathname.startsWith('/expose/');
}

function analyseExposePage() {
  const exposeItemAttributes = document.getElementsByClassName('main-criteria-container')[0];
  const itemPriceValueElement = exposeItemAttributes.querySelector('.is24qa-kaltmiete-main') || exposeItemAttributes.querySelector('.is24qa-kaufpreis-main');
  const itemAreaValueElement = exposeItemAttributes.querySelector('.is24qa-flaeche-main') || exposeItemAttributes.querySelector('.is24qa-wohnflaeche-ca-main');
  const price = extractValue(itemPriceValueElement);
  const area = extractValue(itemAreaValueElement);
  const pricePerArea = calculatePricePerArea(price, area);
  insertPricePerAreaToExposeItem(exposeItemAttributes, pricePerArea);
}

function insertPricePerAreaToExposeItem(exposeItemAttributes, pricePerArea) {
  const pricePerAreaText = convertPriceToText(pricePerArea);
  const pricePerAreaElement =
    `<div class="mainCriteria flex-item">
        <div class="is24-value font-semibold x-pricePerArea">${pricePerAreaText}</div>
        <div class="is24-label font-s">Grundpreis</div>
    </div>`;

  exposeItemAttributes.insertAdjacentHTML('beforeend', pricePerAreaElement);
}
