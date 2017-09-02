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

  var formSubmitHandler = function (evt) {
    if (setupUserName.value.length >= 2) {
      window.backend.save(new FormData(form), window.dialog.closePopup, window.backend.displayError);
    }

    evt.preventDefault();
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
  };

  var setupUserNameFocusoutHandler = function () {
    document.addEventListener('keydown', window.dialog.popupEscPressHandler);
  };

  var setup = document.querySelector('.setup');
  var form = setup.querySelector('.setup-wizard-form');

  form.addEventListener('submit', formSubmitHandler);

  var setupPlayer = form.querySelector('.setup-player');

  setupPlayer.addEventListener('click', setupPlayerClickHandler);

  var setupUserName = form.querySelector('.setup-user-name');

  setupUserName.addEventListener('input', setupUserNameInputHandler);
  setupUserName.addEventListener('focus', setupUserNameFocusHandler);
  setupUserName.addEventListener('focusout', setupUserNameFocusoutHandler);

  var shop = form.querySelector('.setup-artifacts-shop');
  var shopElements = form.querySelectorAll('.setup-artifacts-cell img');
  [].forEach.call(shopElements, function (item) {
    item.draggable = true;
  });

  var setupArtifacts = form.querySelector('.setup-artifacts');

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

    evt.preventDefault();
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
