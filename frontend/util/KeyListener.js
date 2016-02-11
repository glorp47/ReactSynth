var $ = require('jquery')
    KeyActions = require('../actions/KeyActions'),
    TONES = require("../constants/Tones");

$(function () {
  var NOTE_MAP = {}, tones = Object.keys(window.TONES);
  var validKeys = [
    65,
  87,
  83,
  69,
  68,
  70,
  84,
  71,
  89,
  72,
  85,
  74,
  75,
  79,
  76,
  80,
  186,
  222
  ];
  tones.forEach(function(tone, i) {
    NOTE_MAP[validKeys[i]] = tone;
  });

  var _heldKeys = [];

  $(document).on('keydown', function (e) {
    var code = e.keyCode,
        valid = validKeys.indexOf(code) !== -1;
    if (_heldKeys.indexOf(code) === -1 && valid) {
      _heldKeys.push(code);
      KeyActions.keyPressed(NOTE_MAP[code]);
    }
  });

  $(document).on('keyup', function (e) {
    var code = e.keyCode,
        idx = _heldKeys.indexOf(code);
    if (idx !== -1) {
      _heldKeys.splice(idx, 1);
      KeyActions.keyReleased(NOTE_MAP[code]);
    }
  });
});
