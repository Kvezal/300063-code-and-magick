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
  var number = Math.floor(Math.random() * maxNumber);

  return number;
};

var generateNames = function (names, surnames, amount) {
  var fullNames = [];

  for (var i = 0; i < amount; i++) {
    fullNames[i] = names[generateIntegerNumber(amount)] + ' ' + surnames[generateIntegerNumber(amount)];
  }

  return fullNames;
};

var generateColors = function (colors, amount) {
  var listOfColors = [];

  for (var i = 0; i < amount; i++) {
    listOfColors[i] = colors[generateIntegerNumber(amount)];
  }

  return listOfColors;
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

var fullNames = generateNames(WIZARD_NAMES, WIZARD_SURNAMES, 4);
var coatColors = generateColors(WIZARD_COAT_COLORS, 4);
var eyesColors = generateColors(WIZARD_EYES_COLORS, 4);

var wizards = [
  {
    name: fullNames[0],
    coatColor: coatColors[0],
    eyesColor: eyesColors[0]
  },
  {
    name: fullNames[1],
    coatColor: coatColors[1],
    eyesColor: eyesColors[1]
  },
  {
    name: fullNames[2],
    coatColor: coatColors[2],
    eyesColor: eyesColors[2]
  },
  {
    name: fullNames[3],
    coatColor: coatColors[3],
    eyesColor: eyesColors[3]
  }
];

var wizardsFragment = createWizards(wizards, similarWizardTemplate, wizards.length);

similarListElement.appendChild(wizardsFragment);
