'use strict';

(function () {

  var setupOpenClickHandler = function () {
    window.util.openPopup();
  };

  var setupOpenEnterPressHandler = function (evt) {
    window.util.isEnterEvent(evt, window.util.openPopup);
  };

  var setupCloseClickHandler = function () {
    window.util.closePopup();
  };

  var setupCloseEnterPressHandler = function (evt) {
    window.util.isEnterEvent(evt, window.util.closePopup);
  };

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');

  setupOpen.addEventListener('click', setupOpenClickHandler);
  setupOpen.addEventListener('keydown', setupOpenEnterPressHandler);

  setupClose.addEventListener('click', setupCloseClickHandler);
  setupClose.addEventListener('keydown', setupCloseEnterPressHandler);
})();
