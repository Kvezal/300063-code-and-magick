'use strict';

(function () {
  var OFFSET = 10; // px

  var popupElement = document.createElement('div');
  popupElement.classList.add('wizard-artifacts');
  popupElement.style.display = 'none';
  document.body.appendChild(popupElement);

  var mouseMoveHandler = function (evt) {
    popupElement.style.top = evt.pageY + OFFSET + 'px';
    popupElement.style.left = evt.pageX + OFFSET + 'px';
  };

  window.popup = function (target, callback) {
    var mouseOutHandler = function () {
      popupElement.style.display = 'none';

      target.removeEventListener('mousemove', mouseMoveHandler);
      target.removeEventListener('mouseleave', mouseOutHandler);
    };

    target.addEventListener('mouseenter', function () {
      while (popupElement.firstChild) {
        popupElement.removeChild(popupElement.firstChild);
      }

      popupElement.appendChild(callback());
      popupElement.style.display = 'block';

      target.addEventListener('mousemove', mouseMoveHandler);
      target.addEventListener('mouseleave', mouseOutHandler);
    });
  };
})();
