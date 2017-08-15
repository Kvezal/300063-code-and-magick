'use strict';

var renderCloud = function (ctx) {
  ctx.beginPath();
  ctx.moveTo(100, 10);

  ctx.bezierCurveTo(110, 0, 195, 0, 205, 25);
  ctx.bezierCurveTo(220, 0, 295, 0, 310, 25);
  ctx.bezierCurveTo(320, 0, 405, 0, 415, 25);
  ctx.bezierCurveTo(425, 0, 510, 0, 520, 10);

  ctx.bezierCurveTo(560, 30, 540, 80, 520, 95);
  ctx.bezierCurveTo(530, 115, 530, 130, 520, 145);
  ctx.bezierCurveTo(540, 165, 530, 180, 520, 195);
  ctx.bezierCurveTo(540, 210, 560, 260, 520, 280);

  ctx.bezierCurveTo(510, 290, 425, 290, 415, 265);
  ctx.bezierCurveTo(405, 290, 320, 290, 310, 265);
  ctx.bezierCurveTo(295, 290, 220, 290, 205, 265);
  ctx.bezierCurveTo(195, 290, 110, 290, 100, 280);

  ctx.bezierCurveTo(60, 260, 80, 210, 100, 195);
  ctx.bezierCurveTo(90, 180, 80, 165, 100, 145);
  ctx.bezierCurveTo(90, 130, 90, 115, 100, 95);
  ctx.bezierCurveTo(80, 80, 60, 30, 100, 10);

  ctx.closePath();
  ctx.stroke();

  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;

  ctx.fillStyle = '#ffffff';
  ctx.fill();

  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
};

var renderColumn = function (ctx, max, columnNumber, time, name) {
  if (name === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = 'rgba(0, 0, 255, ' + (0.2 + Math.random() * 0.8) + ')';
  }

  var histogramHeight = 150;
  var step = histogramHeight / max;

  var columnWidth = 40;
  var distanceBetweenColumns = 50;
  var columnHeight = time * step;
  var columnPositionX = 150 + (columnWidth + distanceBetweenColumns) * columnNumber;
  var columnPositionY = 100 + histogramHeight - columnHeight;

  var playerTime = '' + Math.round(time);
  var playerName = '' + name;

  ctx.fillText(playerTime, columnPositionX, columnPositionY - 5);
  ctx.fillRect(columnPositionX, columnPositionY, columnWidth, columnHeight);

  ctx.textBaseline = 'hanging';
  ctx.fillText(playerName, columnPositionX, 255);
  ctx.textBaseline = 'alphabetic';
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx);

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 230, 50);

  var max = -1;
  var maxIndex = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
      maxIndex = i;
    }
  }

  ctx.fillText('Худшее время: ' + max.toFixed(2) + 'мс у игрока ' + names[maxIndex], 130, 75);

  for (var j = 0; j < times.length; j++) {
    renderColumn(ctx, max, j, times[j], names[j]);
  }
};
