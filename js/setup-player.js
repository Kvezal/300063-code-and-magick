'use strict';

(function () {
  var WIZARD_FIREBALLS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  var setupPlayerClickHandler = function (evt) {
    var target = evt.target;
    var targetClass = target.classList;

    if (targetClass.contains('wizard-coat')) {
      window.colorizeElement(target, window.parametersWizards.WIZARD_COAT_COLORS, fillElement);
    } else if (targetClass.contains('wizard-eyes')) {
      window.colorizeElement(target, window.parametersWizards.WIZARD_EYES_COLORS, fillElement);
    } else if (targetClass.contains('setup-fireball')) {
      window.colorizeElement(target, WIZARD_FIREBALLS, changeElementBackground);
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
    document.removeEventListener('keydown', window.dialog.popupEscPressHandler);

    setupSubmit.removeEventListener('click', setupSubmitClickHandler);
    setupSubmit.removeEventListener('keydown', setupSubmitEnterPressHandler);
  };

  var setupUserNameFocusoutHandler = function () {
    document.addEventListener('keydown', window.dialog.popupEscPressHandler);

    setupSubmit.addEventListener('click', setupSubmitClickHandler);
    setupSubmit.addEventListener('keydown', setupSubmitEnterPressHandler);
  };

  var setupSubmitClickHandler = function () {
    if (setupUserName.value.length >= 2) {
      window.dialog.closePopup();
    }
  };

  var setupSubmitEnterPressHandler = function (evt) {
    if (setupUserName.value.length >= 2) {
      window.dialog.isEnterEvent(evt, window.dialog.closePopup);
    }
  };

  var setup = window.renderingWizards.getSetupElement;
  var setupPlayer = setup.querySelector('.setup-player');

  setupPlayer.addEventListener('click', setupPlayerClickHandler);

  var setupUserName = setup.querySelector('.setup-user-name');

  setupUserName.addEventListener('input', setupUserNameInputHandler);
  setupUserName.addEventListener('focus', setupUserNameFocusHandler);
  setupUserName.addEventListener('focusout', setupUserNameFocusoutHandler);

  var setupSubmit = setup.querySelector('.setup-submit');

  setupSubmit.addEventListener('click', setupSubmitClickHandler);
  setupSubmit.addEventListener('keydown', setupSubmitEnterPressHandler);

  var shop = setup.querySelector('.setup-artifacts-shop');
  var shopElements = shop.querySelectorAll('.setup-artifacts-cell img');
  shopElements.forEach(function (item) {
    item.draggable = true;
  });

  var setupArtifacts = setup.querySelector('.setup-artifacts');

  var draggedItem = null;

  shop.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName === 'IMG') {
      draggedItem = evt.target.cloneNode(true);
      evt.dataTransfer.setData('text/plain', draggedItem);
    }
  });

  setupArtifacts.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName === 'IMG') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', draggedItem);
    }
  });

  setupArtifacts.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  setupArtifacts.addEventListener('drop', function (evt) {
    var target = evt.target;

    if (target.tagName === 'IMG') {
      target = target.parentElement;
    }

    target.style.backgroundColor = '';
    target.style.outline = '';

    if (!evt.target.children.length && evt.target.tagName !== 'IMG') {
      evt.target.appendChild(draggedItem);
    }
  });

  setupArtifacts.addEventListener('dragenter', function (evt) {
    var target = evt.target;

    if (target.tagName === 'IMG') {
      target = target.parentElement;
    }

    target.style.backgroundColor = 'yellow';

    if (target.children.length === 0 && target.tagName !== 'IMG') {
      target.style.outline = '2px solid red';
    }

    evt.preventDefault();
  });

  setupArtifacts.addEventListener('dragleave', function (evt) {
    var target = evt.target;

    if (target.tagName === 'IMG') {
      target = target.parentElement;
    }

    target.style.backgroundColor = '';
    target.style.outline = '';
    evt.preventDefault();
  });
})();
