'use strict';

(function () {
  var WIZARD_FIREBALLS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
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

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === wizardParameters.colorCoat) {
      rank += 2;
    }
    if (wizard.colorEyes === wizardParameters.colorEyes) {
      rank += 1;
    }

    return rank;
  };

  var nameComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var sortWizardsByRank = function (wizards) {
    return wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = nameComparator(left.name, right.name);
      }
      return rankDiff;
    });
  };

  var updateWizards = function () {
    window.render(sortWizardsByRank(wizards));
  };

  var fillElement = function (element, color) {
    element.style.fill = color;
    currentColor = color;

    window.debounce(updateWizards);
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  var currentColor;

  var wizardParameters = {
    colorCoat: 'rgb(101, 137, 164)',
    colorEyes: 'rgb(0, 0, 0)'
  };

  var setupPlayerClickHandler = function (evt) {
    var target = evt.target;
    var targetClass = target.classList;

    if (targetClass.contains('wizard-coat')) {
      window.colorizeElement(target, WIZARD_COAT_COLORS, fillElement);
      wizardParameters.colorCoat = currentColor;
    } else if (targetClass.contains('wizard-eyes')) {
      window.colorizeElement(target, WIZARD_EYES_COLORS, fillElement);
      wizardParameters.colorEyes = currentColor;
    } else if (targetClass.contains('setup-fireball')) {
      window.colorizeElement(target, WIZARD_FIREBALLS, changeElementBackground);
    }
  };

  var setupPlayer = document.querySelector('.setup-player');

  setupPlayer.addEventListener('click', setupPlayerClickHandler);

  var wizards = [];

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  window.backend.load(successHandler, window.backend.displayError);
})();
