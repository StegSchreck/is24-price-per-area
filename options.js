const colorHighlightFeatureToggle = document.getElementById('ColorHighlightFeatureToggle');
const colorHighlightMethodToggle = document.getElementById('ColorHighlightMethodToggle');
const colorHighlightLowInput = document.getElementById('ColorHighlightLow');
const colorHighlightHighInput = document.getElementById('ColorHighlightHigh');


// Restores select box and checkbox state using the preferences stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    colorHighlightFeatureToggle: true,
    colorHighlightMethodToggle: false,
    colorHighlightLow: 10,
    colorHighlightHigh: 15
  }, (items) => {
    colorHighlightFeatureToggle.checked = items.colorHighlightFeatureToggle;
    colorHighlightMethodToggle.checked = items.colorHighlightMethodToggle;
    colorHighlightLowInput.value = items.colorHighlightLow;
    colorHighlightHighInput.value = items.colorHighlightHigh;
    if (items.colorHighlightFeatureToggle) {
      document.querySelector('label[for="ColorHighlightFeatureToggle"]').classList.add('is-checked');
    }
    if (items.colorHighlightMethodToggle) {
      document.querySelector('label[for="ColorHighlightMethodToggle"]').classList.add('is-checked');
    }
  });
}

document.addEventListener('DOMContentLoaded', restore_options);


colorHighlightFeatureToggle.addEventListener('change', () =>  {
  const enableColorHighlightFeature = colorHighlightFeatureToggle.checked;
  console.log("colorHighlightFeatureToggle: " + enableColorHighlightFeature);
  chrome.storage.sync.set({colorHighlightFeatureToggle: enableColorHighlightFeature});
});

colorHighlightMethodToggle.addEventListener('change', () => {
  const useBackgroundColorForHighlighting = colorHighlightMethodToggle.checked;
  console.log("colorHighlightMethodToggle: " + useBackgroundColorForHighlighting);
  chrome.storage.sync.set({colorHighlightMethodToggle: useBackgroundColorForHighlighting});

  for (const textColorIcon of document.getElementsByClassName('textColor')){
    if (useBackgroundColorForHighlighting) {
      textColorIcon.setAttribute('hidden', useBackgroundColorForHighlighting);
    } else {
      textColorIcon.removeAttribute('hidden');
    }
  }

  for (const textBackgroundColorIcon of document.getElementsByClassName('textBackgroundColor')){
    if (useBackgroundColorForHighlighting) {
      textBackgroundColorIcon.removeAttribute('hidden');
    } else {
      textBackgroundColorIcon.setAttribute('hidden', !useBackgroundColorForHighlighting);
    }
  }
});

colorHighlightLowInput.addEventListener('change', () => {
  const colorHighlightLow = parseFloat(colorHighlightLowInput.value);
  const colorHighlightHigh = parseFloat(colorHighlightHighInput.value);
  console.log("colorHighlightLowInput: " + colorHighlightLow);
  chrome.storage.sync.set({colorHighlightLow: colorHighlightLow});

  if (colorHighlightHigh < colorHighlightLow) {
    colorHighlightHighInput.value = colorHighlightLow;
    chrome.storage.sync.set({colorHighlightHigh: colorHighlightLow});
  }
});

colorHighlightHighInput.addEventListener('change', () => {
  const colorHighlightLow = parseFloat(colorHighlightLowInput.value);
  const colorHighlightHigh = parseFloat(colorHighlightHighInput.value);
  console.log("colorHighlightHighInput: " + colorHighlightHigh);
  chrome.storage.sync.set({colorHighlightHigh: colorHighlightHigh});

  if (colorHighlightLow > colorHighlightHigh) {
    colorHighlightLowInput.value = colorHighlightHigh;
    chrome.storage.sync.set({colorHighlightLow: colorHighlightHigh});
  }
});
