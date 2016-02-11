var React = require("react"),
    Track = require('../util/Track'),
    TrackActions = require('../actions/TrackActions');


var TrackPlayer = React.createClass({

  getInitialState: function () {
    return {looping: false, deleted: false, playing: false};
  },

  isLooping: function () {
    return this.state.looping;
  },

  playClick: function () {
    this.play();
  },

  destroyClick: function () {
    var that = this;
    this.setState({ looping: false, deleted: true });

    setInterval( function() {if(!that.state.looping){ that.destroy(); clearInterval();  } }, 20);
    ;
  },

  destroy: function () {

    TrackActions.destroyTrack(this.props.track);
  },

  loopMessage: function () {
    if (this.isLooping() || this.state.deleted || this.state.playing) {
      return "Stop Loop";
    } else {
      return "Start Loop";
    }
  },

  loopClick: function (e) {
    if (this.state.looping || this.state.playing) {
      this.setState({ looping: false });
    } else {

      this.loop();
      this.setState({ looping: true });
    }
  },

  play: function () {
    this.setState({ looping: false, playing: true })
    if (this.interval) { return; }

    var currentNote = 0,
        playBackStartTime = Date.now(),
        roll = this.props.track["roll"],
        delta;

    this.interval = setInterval(function () {
      if (currentNote < roll.length) {
        delta = Date.now() - playBackStartTime;

        if (delta >= roll[currentNote].time) {
          var notes = roll[currentNote].notes || [];
          KeyActions.groupUpdate(notes);
          currentNote++;
        }
      } else {
        this.setState({ playing: false })
        clearInterval(this.interval);
        delete this.interval;
      }
    }.bind(this), 1);
  },

  loop: function () {
    if (this.interval) { return; }

    var currentNote = 0,
        playBackStartTime = Date.now(),
        roll = this.props.track["roll"],
        that = this,
        delta;

    this.interval = setInterval(function () {
      if (currentNote < roll.length) {
        delta = Date.now() - playBackStartTime;

        if (delta >= roll[currentNote].time) {
          var notes = roll[currentNote].notes || [];
          KeyActions.groupUpdate(notes);
          currentNote++;
        }
      } else {
        clearInterval(this.interval);
        delete this.interval;
        if(this.state.looping)
        {this.loop()};
      }
    }.bind(this), 1);
  },



  render: function () {

    return (
      <div className="track">
        <p className="track-name">{this.props.track.name}:</p>
        <button onClick={this.playClick} className="btn">Play</button>
        <button onClick={this.loopClick} className="btn">{this.loopMessage()}</button>
        <button onClick={this.destroyClick} className="btn">Delete</button>
      </div>
    );
  }

});


module.exports = TrackPlayer;
