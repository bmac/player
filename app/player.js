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
	    // ended: '',
	    // pause: '',
	    // play: '',
	    'timeupdate audio': 'onTimeupdate'
//	    volumechange: ''
	},
	initialize: function() {
	    this._propagateAudioEvents();
	    window.audio = this.$('audio')[0];
	},

	onTimeupdate: function() {
	    console.log('time update');
	    var audio = this.$('.player-audio')[0];
	    var percent = Math.floor((audio.currentTime / audio.duration) * 100) || 0;
	    var range = this.$('.player-range');
	    range.prop('value', percent);
	},

	_propagateAudioEvents: function() {
	    var audioEvents = ['timeupdate'];
	    var $audio = this.$el.find('audio');
	    _.each(audioEvents, function(event) {
		$audio.on(event, function (e) {
		    if (!e.isTrigger) {
			$.event.simulate( event, e.target, $.event.fix( e ), true );
		    }
		});
	    });

	}


	});

    return {PlayerView: player};
});
