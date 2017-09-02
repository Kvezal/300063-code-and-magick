'use strict';

(function () {
  var resetSetupPosition = function () {
    setup.style.top = '';
    setup.style.left = '';
  };

  var setupOpenClickHandler = function () {
    window.dialog.openPopup();
  };

  var setupOpenEnterPressHandler = function (evt) {
    window.utils.isEnterEvent(evt, function () {
      window.dialog.openPopup();
    });
  };

  var setupCloseClickHandler = function () {
    window.dialog.closePopup();
  };

  var setupCloseEnterPressHandler = function (evt) {
    window.utils.isEnterEvent(evt, function () {
      window.dialog.closePopup();
    });
  };

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var dialogHandle = setup.querySelector('.upload');

  setupOpen.addEventListener('click', setupOpenClickHandler);
  setupOpen.addEventListener('keydown', setupOpenEnterPressHandler);

  setupClose.addEventListener('click', setupCloseClickHandler);
  setupClose.addEventListener('keydown', setupCloseEnterPressHandler);

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var setupUserAvatar = dialogHandle.querySelector('input[name="avatar"]');

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      if (!setupUserAvatar.classList.contains('hidden')) {
        setupUserAvatar.classList.add('hidden');
      }

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      setupUserAvatar.classList.remove('hidden');

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  window.dialog = {
    popupEscPressHandler: function (evt) {
      window.utils.isEscEvent(evt, function () {
        setup.classList.add('hidden');
        resetSetupPosition();
      });
    },

    openPopup: function () {
      setup.classList.remove('hidden');

      document.addEventListener('keydown', window.dialog.popupEscPressHandler);
      resetSetupPosition();
    },

    closePopup: function () {
      setup.classList.add('hidden');

      document.removeEventListener('keydown', window.dialog.popupEscPressHandler);
    }
  };
})();
