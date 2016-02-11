var AppDispatcher = require("../dispatcher/Dispatcher"),
    OrganConstants = require("../constants/OrganConstants");

var FilterActions = {
  updateVolume: function(volume) {
    AppDispatcher.dispatch({
      actionType: OrganConstants.VOLUMECHANGED,
      volume: volume
    });
  },

  updateWaveform: function(waveform) {
    AppDispatcher.dispatch({
      actionType: OrganConstants.WAVEFORMCHANGED,
      waveform: waveform
    });
  },

};


module.exports = FilterActions;
