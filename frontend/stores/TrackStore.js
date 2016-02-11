var _tracks = [];
    Store = require ("flux/utils").Store,
    OrganConstants = require("../constants/OrganConstants"),
    AppDispatcher = require('../dispatcher/Dispatcher'),
    TrackStore = new Store(AppDispatcher);


TrackStore.all = function () {
  return _tracks.slice(0);
};

TrackStore.__onDispatch = function (payload) {
  switch(payload.actionType){
  case OrganConstants.ADD_TRACK:
    TrackStore._addTrack(payload.track);
    break;
  case OrganConstants.RESET_TRACKS:
    TrackStore._resetTracks(payload.tracks);
    break;
    case OrganConstants.DESTROY_TRACK:
    TrackStore._destroyTrack(payload.track);
    break;
  default:
  }
};

TrackStore._addTrack = function (track) {
  var idx = _tracks.indexOf(track);
    _tracks.push(track);
    this.__emitChange();
};

TrackStore._destroyTrack = function (track) {
  var idx = _tracks.indexOf(track);
      if (idx !== -1) {
    _tracks.splice(idx, 1);
      this.__emitChange();
    }
};

TrackStore._resetTracks = function (tracks) {
  _tracks = tracks.slice();
  this.__emitChange();
};

module.exports = TrackStore;
