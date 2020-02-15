'use strict';

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
