'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  window.util = {
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },

    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    setup: document.querySelector('.setup'),

    popupEscPressHandler: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        window.util.setup.classList.add('hidden');
      }
    },

    openPopup: function () {
      window.util.setup.classList.remove('hidden');

      document.addEventListener('keydown', this.popupEscPressHandler);
    },

    closePopup: function () {
      window.util.setup.classList.add('hidden');

      document.removeEventListener('keydown', this.popupEscPressHandler);
    }
  };
})();
