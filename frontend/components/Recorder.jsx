var React = require('react'),
    Track = require("../util/Track"),
    KeyStore = require('../stores/KeyStore'),
    TrackActions = require('../actions/TrackActions');;

var Recorder = React.createClass({
  componentDidMount: function () {
    KeyStore.addListener(this._keysChanged);
  },

  getInitialState: function () {
    return { recording: false, track: new Track() };
  },

  isDoneRecording: function () {
    return !this.isTrackNew() && !this.state.recording;
  },

  isRecording: function () {
    return this.state.recording;
  },

  isTrackNew: function () {
    return this.state.track.isBlank();
  },

  playClass: function () {
    return "play-button" + this.isTrackNew() ? "" : " disabled";
  },

  playClick: function (e) {
    if(!this.isTrackNew()){
      this.state.track.play();
    }
  },

  recordingMessage: function () {
    if (this.isRecording()) {
      return "Stop Recording";
    } else {
      return "Start Recording";
    }
  },

  recordClick: function (e) {
    if (this.state.recording) {
      this.state.track.completeRecording();
      this.setState({ recording: false });
      this.saveTrack();
    } else {
      this.setState({ recording: true });
      this.state.track.startRecording();
    }
  },

  render: function () {
    var hasTrack = this.isTrackNew();

    return (
      <div className="recorder changer">
        <h3>RECORDER</h3>
        <button onClick={this.recordClick} className="record-button">
          { this.recordingMessage() }
        </button>
      </div>
    );
  },

  saveTrack: function (e) {
    this.state.track.set('name', prompt("Type in the saved track name"));
    this.save();
  },

  save: function () {
    if(this.state.track.attributes.roll.length === 1)
    {throw "Notes can't be blank!";}
    else if (this.state.track.attributes.name === "") {
      throw "Name can't be blank!";
    } else if (!!this.state.track.attributes.name) {
      TrackActions.addTrack(this.state.track.attributes);
      this.setState({ track: new Track() });
    };
  },

  trackSavingElements: function () {
    if (this.isDoneRecording()) {
      return (
        <button onClick={this.saveTrack} className="btn">
          Save Track
        </button>
      );
    }
  },

  _keysChanged: function () {
    if (this.state.recording){
      this.state.track.addNotes(KeyStore.all());
    }
  }
});

module.exports = Recorder;
