'use strict';

(function () {
  var createWizards = function (listWizards, pattern, amount) {
    var wizardsBlock = document.createDocumentFragment();

    for (var i = 0; i < amount; i++) {
      var wizardElement = pattern.cloneNode('true');
      wizardElement.querySelector('.setup-similar-label').textContent = listWizards[i].name;
      wizardElement.querySelector('.wizard-coat').style.fill = listWizards[i].colorCoat;
      wizardElement.querySelector('.wizard-eyes').style.fill = listWizards[i].colorEyes;

      wizardsBlock.appendChild(wizardElement);
    }

    return wizardsBlock;
  };

  var displayWizards = function (wizards) {
    wizards.sort(function () {
      return 0.5 - Math.random();
    });

    var wizardsFragment = createWizards(wizards, similarWizardTemplate, 4);

    setupSimilarList.appendChild(wizardsFragment);
  };

  var setup = document.querySelector('.setup');
  var setupSimilarList = setup.querySelector('.setup-similar-list');

  var wizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarWizardTemplate = wizardTemplate.querySelector('.setup-similar-item');

  window.backend.load(displayWizards, window.backend.displayError);
})();
