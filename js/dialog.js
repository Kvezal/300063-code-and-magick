'use strict';

(function () {
  var setupOpenClickHandler = function () {
    window.dialog.openPopup(setup);
  };

  var setupOpenEnterPressHandler = function (evt) {
    window.utils.isEnterEvent(evt, function () {
      window.dialog.openPopup(setup);
    });
  };

  var setupCloseClickHandler = function () {
    window.dialog.closePopup(setup);
  };

  var setupCloseEnterPressHandler = function (evt) {
    window.utils.isEnterEvent(evt, function () {
      window.dialog.closePopup(setup);
    });
  };

  var setup = window.renderingWizards.getSetupElement;
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');

  setupOpen.addEventListener('click', setupOpenClickHandler);
  setupOpen.addEventListener('keydown', setupOpenEnterPressHandler);

  setupClose.addEventListener('click', setupCloseClickHandler);
  setupClose.addEventListener('keydown', setupCloseEnterPressHandler);

  window.dialog = {
    popupEscPressHandler: function (evt) {
      window.utils.isEscEvent(evt, function () {
        setup.classList.add('hidden');
      });
    },

    openPopup: function () {
      setup.classList.remove('hidden');

      document.addEventListener('keydown', window.dialog.popupEscPressHandler);
    },

    closePopup: function () {
      setup.classList.add('hidden');

      document.removeEventListener('keydown', window.dialog.popupEscPressHandler);
    }
  };
})();
