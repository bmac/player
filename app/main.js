require([
    // Application.
    "app",

    // Main Router.
    "router",
    "player"
],

        function(app, Router, player) {

            // Define your master router on the application namespace and trigger all
            // navigation from this instance.
            app.router = new Router();

            // Trigger the initial route and enable HTML5 History API support, set the
            // root folder to '/' by default.  Change in app.js.
            Backbone.history.start({ pushState: true, root: app.root });

            var playerModel = new Backbone.Model({
                src: 'https://dl.dropbox.com/s/hp9gkx5armw9yq9/bornToRun.mp3?dl=1'
            });

            window.pv = new player.PlayerView({model: playerModel});

        });
