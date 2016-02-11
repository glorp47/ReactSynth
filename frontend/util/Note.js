var ctx = new (window.AudioContext || window.webkitAudioContext)();
var FilterStore = require('../stores/FilterStore.js');

var createOscillator = function (freq) {
  var osc = ctx.createOscillator();
  osc.type = FilterStore.waveform();
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start(ctx.currentTime);
  return osc;
};

var createGainNode = function () {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  gainNode.connect(ctx.destination);
  return gainNode;
};

var Note = function (freq) {
  this.oscillatorNode = createOscillator(freq);
  this.gainNode = createGainNode();
  this.oscillatorNode.connect(this.gainNode);
};

Note.prototype = {
  start: function () {
    this.gainNode.gain.value = FilterStore.volume();
  },

  stop: function () {
    this.gainNode.gain.value = 0;
  }
};

module.exports = Note;
