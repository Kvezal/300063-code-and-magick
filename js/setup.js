'use strict';

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

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
var WIZARD_FIREBALLS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
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

var changeColorElement = function (element, colors, prop) {
  var colorElement = element.style[prop];
  var currentColor = 0;

  if (colorElement) {
    currentColor = colors.indexOf(colorElement);
  }

  if (currentColor < colors.length - 1) {
    element.style[prop] = colors[++currentColor];
  } else {
    element.style[prop] = colors[0];
  }
};

var changeRandomHEXColorElement = function (element, colors, prop) {
  if (HEXColorFireBallIndex < colors.length - 1) {
    element.style[prop] = colors[++HEXColorFireBallIndex];
  } else {
    HEXColorFireBallIndex = 0;
    element.style[prop] = colors[HEXColorFireBallIndex];
  }
};

var setupOpenClickHandler = function () {
  openPopup();
};

var setupOpenEnterPressHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
};

var setupCloseClickHandler = function () {
  closePopup();
};

var setupCloseEnterPressHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};

var setupUserNameInputHandler = function (evt) {
  var target = evt.target;

  target.setCustomValidity('');

  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  }
};

var setupUserNameFocusHandler = function () {
  document.removeEventListener('keydown', popupEscPressHandler);

  setupSubmit.removeEventListener('click', setupSubmitClickHandler);
  setupSubmit.removeEventListener('keydown', setupSubmitEnterPressHandler);
};

var setupUserNameFocusoutHandler = function () {
  document.addEventListener('keydown', popupEscPressHandler);

  setupSubmit.addEventListener('click', setupSubmitClickHandler);
  setupSubmit.addEventListener('keydown', setupSubmitEnterPressHandler);
};

var setupPlayerClickHandler = function (evt) {
  var target = evt.target;
  var targetClass = target.classList;

  if (targetClass.contains('wizard-coat')) {
    changeColorElement(target, WIZARD_COAT_COLORS, 'fill');
  } else if (targetClass.contains('wizard-eyes')) {
    changeColorElement(target, WIZARD_EYES_COLORS, 'fill');
  } else if (targetClass.contains('setup-fireball')) {
    changeRandomHEXColorElement(target, WIZARD_FIREBALLS, 'background-color');
  }
};

var popupEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    setup.classList.add('hidden');
  }
};

var setupSubmitClickHandler = function () {
  if (setupUserName.value.length >= 2) {
    closePopup();
  }
};

var setupSubmitEnterPressHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE && setupUserName.value.length >= 2) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', popupEscPressHandler);
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', popupEscPressHandler);
};

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var setupSubmit = setup.querySelector('.setup-submit');

setupOpen.addEventListener('click', setupOpenClickHandler);
setupOpen.addEventListener('keydown', setupOpenEnterPressHandler);

setupClose.addEventListener('click', setupCloseClickHandler);
setupClose.addEventListener('keydown', setupCloseEnterPressHandler);

setupUserName.addEventListener('input', setupUserNameInputHandler);
setupUserName.addEventListener('focus', setupUserNameFocusHandler);
setupUserName.addEventListener('focusout', setupUserNameFocusoutHandler);

var setupSimilar = setup.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

var wizardTemplate = document.querySelector('#similar-wizard-template').content;
var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');
var similarWizardTemplate = wizardTemplate.querySelector('.setup-similar-item');

var wizards = getNewWizards(4);

var wizardsFragment = createWizards(wizards, similarWizardTemplate, wizards.length);

setupSimilarList.appendChild(wizardsFragment);

var HEXColorFireBallIndex = 0;

var setupPlayer = setup.querySelector('.setup-player');
setupPlayer.addEventListener('click', setupPlayerClickHandler);

setupSubmit.addEventListener('click', setupSubmitClickHandler);
setupSubmit.addEventListener('keydown', setupSubmitEnterPressHandler);
