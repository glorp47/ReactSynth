var $ = require("jquery"),
    Track = require("./Track"),
    AppDispatcher = require('../dispatcher/Dispatcher'),
    TrackActions = require("../actions/TrackActions");

var TrackApiUtil = {
  createTrack: function (track) {
        TrackActions.addTrack(new Track(track));
  },

  fetchTracks: function () {
      TrackActions.resetTracks(tracks);
  },

  destroyTrack: function (trackId) {
    if (!trackId)
    {return;}
        TrackActions.destroyTrack(trackId);
  }

};

AppDispatcher.register(function(payload) {
  switch(payload.actionType){
  case OrganConstants.CREATE_TRACK:
    TrackApiUtil.createTrack(payload.track);
    break;
  case OrganConstants.DESTROY_TRACK:
    TrackApiUtil.destroyTrack(payload.track);
    break;
  default:
  }
})


module.exports = TrackApiUtil;
