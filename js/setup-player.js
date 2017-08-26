'use strict';

(function () {
  var WIZARD_FIREBALLS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var changeColorElement = function (element, colors, prop) {
    var colorElement = element.style[prop];
    var currentColor = 0;

    if (colorElement) {
      currentColor = colors.indexOf(colorElement);
    }

    if (currentColor < colors.length - 1) {
      element.style[prop] = colors[++currentColor];
      return;
    }

    element.style[prop] = colors[0];
  };

  var changeRandomHEXColorElement = function (element, colors, prop) {
    if (HEXColorFireBallIndex < colors.length - 1) {
      element.style[prop] = colors[++HEXColorFireBallIndex];
      return;
    }

    HEXColorFireBallIndex = 0;
    element.style[prop] = colors[HEXColorFireBallIndex];
  };

  var setupPlayerClickHandler = function (evt) {
    var target = evt.target;
    var targetClass = target.classList;

    if (targetClass.contains('wizard-coat')) {
      changeColorElement(target, window.parametersWizards.WIZARD_COAT_COLORS, 'fill');
    } else if (targetClass.contains('wizard-eyes')) {
      changeColorElement(target, window.parametersWizards.WIZARD_EYES_COLORS, 'fill');
    } else if (targetClass.contains('setup-fireball')) {
      changeRandomHEXColorElement(target, WIZARD_FIREBALLS, 'background-color');
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
    document.removeEventListener('keydown', window.util.popupEscPressHandler);

    setupSubmit.removeEventListener('click', setupSubmitClickHandler);
    setupSubmit.removeEventListener('keydown', setupSubmitEnterPressHandler);
  };

  var setupUserNameFocusoutHandler = function () {
    document.addEventListener('keydown', window.util.popupEscPressHandler);

    setupSubmit.addEventListener('click', setupSubmitClickHandler);
    setupSubmit.addEventListener('keydown', setupSubmitEnterPressHandler);
  };

  var setupSubmitClickHandler = function () {
    if (setupUserName.value.length >= 2) {
      window.util.closePopup();
    }
  };

  var setupSubmitEnterPressHandler = function (evt) {
    if (setupUserName.value.length >= 2) {
      window.util.isEnterEvent(evt, window.util.closePopup);
    }
  };

  var HEXColorFireBallIndex = 0;

  var setupPlayer = window.util.setup.querySelector('.setup-player');
  setupPlayer.addEventListener('click', setupPlayerClickHandler);

  var setupUserName = window.util.setup.querySelector('.setup-user-name');

  setupUserName.addEventListener('input', setupUserNameInputHandler);
  setupUserName.addEventListener('focus', setupUserNameFocusHandler);
  setupUserName.addEventListener('focusout', setupUserNameFocusoutHandler);

  var setupSubmit = window.util.setup.querySelector('.setup-submit');

  setupSubmit.addEventListener('click', setupSubmitClickHandler);
  setupSubmit.addEventListener('keydown', setupSubmitEnterPressHandler);
})();
