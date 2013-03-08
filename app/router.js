define([
  // Application.
  "app",
  "player"
],

function(app, player) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
	'': 'index',
	'play/*path': 'playFile'
    },

    index: function() {
	var playerModel = new Backbone.Model({
            src: 'https://dl.dropbox.com/s/hp9gkx5armw9yq9/bornToRun.mp3?dl=1'
        });

        window.pv = new player.PlayerView({model: playerModel});
    },
    playFile: function(path) {
	var playerModel = new Backbone.Model({
            src: path
        });

        window.pv = new player.PlayerView({model: playerModel});
    }
  });

  return Router;

});
