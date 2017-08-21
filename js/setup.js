'use strict';

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
var WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var WIZARD_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
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
  var wizardCoatColors = WIZARD_COAT_COLORS.length;
  var wizardEyesColors = WIZARD_EYES_COLORS.length;

  for (var i = 0; i < amountWizards; i++) {
    var generatedWizard = {};
    generatedWizard.name = WIZARD_NAMES[generateIntegerNumber(wizardNamesLength)] + ' ' + WIZARD_SURNAMES[generateIntegerNumber(wizardSurnameLength)];
    generatedWizard.coatColor = WIZARD_COAT_COLORS[generateIntegerNumber(wizardCoatColors)];
    generatedWizard.eyesColor = WIZARD_EYES_COLORS[generateIntegerNumber(wizardEyesColors)];

    if (checkSimilarityWizards(generatedWizard, newWizards)) {
      i--;
      continue;
    }

    newWizards[i] = generatedWizard;
  }

  return newWizards;
};

var createWizards = function (wizards, pattern, amount) {
  var wizardsBlock = document.createDocumentFragment();

  for (var i = 0; i < amount; i++) {
    var wizardElement = pattern.cloneNode('true');
    wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;

    wizardsBlock.appendChild(wizardElement);
  }

  return wizardsBlock;
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var userDialogFooter = userDialog.querySelector('.setup-similar');
userDialogFooter.classList.remove('hidden');

var wizardTemplate = document.querySelector('#similar-wizard-template').content;
var similarListElement = userDialogFooter.querySelector('.setup-similar-list');
var similarWizardTemplate = wizardTemplate.querySelector('.setup-similar-item');

var wizards = getNewWizards(4);

var wizardsFragment = createWizards(wizards, similarWizardTemplate, wizards.length);

similarListElement.appendChild(wizardsFragment);
