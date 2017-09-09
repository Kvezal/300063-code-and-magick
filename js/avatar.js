'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];

  var fileChooser = document.querySelector('.upload input[name="avatar"]');
  var preview = document.querySelector('.setup-user-pic');
  var setupOpenIcon = document.querySelector('.setup-open-icon');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        setupOpenIcon.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
