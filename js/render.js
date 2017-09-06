'use strict';

(function () {
  var wizardTemplate = document.querySelector('#similar-wizard-template');

  var renderWizard = function (wizard) {
    var element = wizardTemplate.content.cloneNode(true);

    var wizardElement = element.querySelector('.wizard');
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    element.querySelector('.setup-similar-label').textContent = wizard.name;

    return element;
  };

  var similarList = document.querySelector('.setup-similar-list');

  window.render = function (data) {
    var amount = data.length > 4 ? 4 : data.length;

    while (similarList.children.length !== 0) {
      similarList.removeChild(similarList.children[0]);
    }

    var wizardsFragment = document.createDocumentFragment();

    for (var i = 0; i < amount; i++) {
      wizardsFragment.appendChild(renderWizard(data[i]));
    }

    similarList.appendChild(wizardsFragment);
    similarList.classList.remove('hidden');
  };
})();
