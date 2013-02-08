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
            'change .player-duration': 'durationSeek',
            'change .player-time': 'inputSeek',
            'change .player-volume': 'volumeChange',
            volumechange: 'updateVolumeSlider'
        },
        initialize: function(options) {
            options = options || {};
            this._propagateAudioEvents();
            window.audio = this.audio = this.$('audio')[0];
            this.$duration = this.$('.player-duration').val(0);
            this.$time = this.$('.player-time');
            this.$volumeRange = this.$('.player-volume');
        },

        onTimeupdate: function() {
                this.updateRangeSliderValue();
                this.updateTimeStamp();
        },
        updateRangeSliderValue: function() {
            var percent = Math.floor((this.audio.currentTime / this.audio.duration) * 100) || 0;
            this.$duration.val(percent);
        },
        updateTimeStamp: function() {
            // If the input has focus do not update it because we don't want to override a change the user is working on
            if (!this.$time.is(':focus')) {
                        this.$time.val(this._formatTime(this.audio.currentTime));
            }
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
        durationSeek: function() {
            var percent = this.$duration.val();
            var newCurrentTime = this.audio.duration * (percent / 100);
            this.audio.currentTime = newCurrentTime;
        },
        inputSeek: function() {
            var newCurrentTime = this._parseSeconds(this.$time.val());
            this.audio.currentTime = newCurrentTime;
        },
        setSource: function(newSrc) {
            this.audio.src = newSrc;
        },
        volumeChange: function() {
            var volume = this.$volumeRange.val();
            this.audio.volume = volume;
        },
        updateVolumeSlider: function() {
            this.$volumeRange.val(this.audio.volume);
        },
        _propagateAudioEvents: function() {
            var audioEvents = 'timeupdate play pause volumechange'.split(' ');
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
            var hours = Math.floor( rawSeconds / 3600 ) % 24,
            minutes = Math.floor( rawSeconds / 60 ) % 60,
            seconds = Math.floor( rawSeconds )  % 60;
            return [minutes, ':', (seconds  < 10 ? "0" + seconds : seconds)].join('');
        },
        _parseSeconds: function(value) {
            var timeParts = value.split(':');
            var seconds = parseInt(timeParts[1], 10);
            var minutes = parseInt(timeParts[0], 10);
            return (60 * minutes) + seconds;
        }

        });

    return {PlayerView: player};
});
