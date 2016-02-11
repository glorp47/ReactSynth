var _params = {volume: 0.3, waveform: "sine"},
    Store = require('flux/utils').Store,
    OrganConstants = require("../constants/OrganConstants"),
    AppDispatcher = require('../dispatcher/Dispatcher'),
    FilterStore = new Store(AppDispatcher);

FilterStore._updateVolume = function(volume) {
  _params.volume = volume;
};

FilterStore._updateWaveform = function(waveform) {
  _params.waveform = waveform;
};

FilterStore.volume = function() {
  return _params.volume;
};

FilterStore.waveform = function() {
  return _params.waveform;
};


FilterStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case OrganConstants.WAVEFORMCHANGED:
      FilterStore._updateWaveform(payload.waveform);
      FilterStore.__emitChange();
      break;
    case OrganConstants.VOLUMECHANGED:
      FilterStore._updateVolume(payload.volume);
      FilterStore.__emitChange();
      break;
  }
};



module.exports = FilterStore;
