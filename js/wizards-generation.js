'use strict';

(function () {
  var WIZARD_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var WIZARD_SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var generateIntegerNumber = function (maxNumber) {
    return Math.floor(Math.random() * maxNumber);
  };

  var checkSimilarityWizards = function (generatedWizards, newWizards) {
    for (var i = 0, newWizardsLength = newWizards.length; i < newWizardsLength; i++) {
      if (newWizards[i].coatColor === generatedWizards.coatColor && newWizards[i].eyesColor === generatedWizards.eyesColor) {
        return true;
      }

      if (newWizards[i].name === generatedWizards.name) {
        return true;
      }
    }

    return false;
  };

  var getNewWizards = function (amountWizards) {
    var newWizards = [];
    var wizardNamesLength = WIZARD_NAMES.length;
    var wizardSurnameLength = WIZARD_SURNAMES.length;
    var wizardCoatColors = window.parametersWizards.WIZARD_COAT_COLORS.length;
    var wizardEyesColors = window.parametersWizards.WIZARD_EYES_COLORS.length;

    for (var i = 0; i < amountWizards; i++) {
      var generatedWizard = {};
      generatedWizard.name = WIZARD_NAMES[generateIntegerNumber(wizardNamesLength)] + ' ' + WIZARD_SURNAMES[generateIntegerNumber(wizardSurnameLength)];
      generatedWizard.coatColor = window.parametersWizards.WIZARD_COAT_COLORS[generateIntegerNumber(wizardCoatColors)];
      generatedWizard.eyesColor = window.parametersWizards.WIZARD_EYES_COLORS[generateIntegerNumber(wizardEyesColors)];

      if (checkSimilarityWizards(generatedWizard, newWizards)) {
        i--;
        continue;
      }

      newWizards[i] = generatedWizard;
    }

    return newWizards;
  };

  window.wizardsGeneration = getNewWizards(4);
})();
