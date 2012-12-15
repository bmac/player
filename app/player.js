define([
  // Libraries.
  "jquery",
  "lodash",
  "backbone"

],

function($, _, Backbone) {

    var player = Backbone.View.extend({

	el: '#player',
	events: {
	    // durationchange: '',
	    // emptied: '',
	    ended: 'showPlayButton',
	    pause: 'showPlayButton',
	    play: 'showPauseButton',
	    'click .play': 'playAudio',
	    'click .pause': 'pauseAudio',
	    'timeupdate audio': 'onTimeupdate',
	    'change .player-range': 'rangeSeek',
	    'change .player-time': 'inputSeek'
//	    volumechange: ''
	},
	initialize: function() {
	    this._propagateAudioEvents();
	    window.audio = this.audio = this.$('audio')[0];
	    this.$range = this.$('.player-range').val(0);
	    this.$time = this.$('.player-time');
	},

	onTimeupdate: function() {
	    var percent = Math.floor((this.audio.currentTime / this.audio.duration) * 100) || 0;
	    this.$range.val(percent);
	    this.$time.val(this._formatTime(this.audio.currentTime));
	},

	showPlayButton: function() {
	    this.$('.pause').text('|>').removeClass('pause').addClass('play');
	},
	showPauseButton: function() {
	    this.$('.play').text('||').removeClass('play').addClass('pause');
	},
	playAudio: function() {
	    this.audio.play();
	},
	pauseAudio: function() {
	    this.audio.pause();
	},
	rangeSeek: function() {
	    var percent = this.$range.val();
	    var newCurrentTime = this.audio.duration * (percent / 100);
	    this.audio.currentTime = newCurrentTime;
	},
	inputSeek: function() {
	    var newCurrentTime = this._parseSeconds(this.$time.val());
	    this.audio.currentTime = newCurrentTime;
	},
	_propagateAudioEvents: function() {
	    var audioEvents = 'timeupdate play pause'.split(' ');
	    var $audio = this.$el.find('audio');
	    this._propagateEvents($audio, audioEvents);
	},
	_propagateEvents: function(element, events) {
	    var $element = element;
	    _.each(events, function(event) {
		$element.on(event, function (e) {
		    if (!e.isTrigger) {
			$.event.simulate( event, e.target, $.event.fix( e ), true );
		    }
		});
	    });

	},
	_formatTime: function(rawSeconds) {
	    var hours = parseInt( rawSeconds / 3600 ) % 24,
	    minutes = parseInt( rawSeconds / 60 ) % 60,
	    seconds = parseInt( rawSeconds )  % 60;
	    return [minutes, ':', (seconds  < 10 ? "0" + seconds : seconds)].join('');
	},
	_parseSeconds: function(value) {
	    var timeParts = value.split(':');
	    var seconds = timeParts[1];
	    var minutes = timeParts[0];
	    return (60 * minutes) + seconds;
	}

	});

    return {PlayerView: player};
});
