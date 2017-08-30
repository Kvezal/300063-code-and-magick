'use strict';

(function () {
  var indexColor = 0;

  window.colorizeElement = function (element, colors, changeColor) {
    indexColor++;

    if (indexColor >= colors.length) {
      indexColor = 0;
    }

    changeColor(element, colors[indexColor]);
  };
})();
