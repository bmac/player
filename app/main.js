require([
    "app",
    "router"
],

        function(app, Router, player) {

            app.router = new Router();

            // Trigger the initial route and enable HTML5 History API support, set the
            // root folder to '/' by default.  Change in app.js.
            Backbone.history.start({ pushState: true, root: app.root });

        });
