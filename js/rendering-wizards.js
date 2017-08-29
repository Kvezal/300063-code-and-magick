'use strict';

(function () {
  var createWizards = function (listWizards, pattern, amount) {
    var wizardsBlock = document.createDocumentFragment();

    for (var i = 0; i < amount; i++) {
      var wizardElement = pattern.cloneNode('true');
      wizardElement.querySelector('.setup-similar-label').textContent = listWizards[i].name;
      wizardElement.querySelector('.wizard-coat').style.fill = listWizards[i].coatColor;
      wizardElement.querySelector('.wizard-eyes').style.fill = listWizards[i].eyesColor;

      wizardsBlock.appendChild(wizardElement);
    }

    return wizardsBlock;
  };

  var setup = document.querySelector('.setup');
  var setupSimilarList = setup.querySelector('.setup-similar-list');

  var wizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarWizardTemplate = wizardTemplate.querySelector('.setup-similar-item');

  var wizardsFragment = createWizards(window.wizardsGeneration, similarWizardTemplate, window.wizardsGeneration.length);

  setupSimilarList.appendChild(wizardsFragment);

  window.renderingWizards = {
    getSetupElement: setup
  };
})();
