(function() {

    window.Game = new GameEngine.Game(800, 800);

    GameEngine.Loader.loadResource({
        type: 'image',
        name: 'isometric_grass_and_water',
        src: '/resources/isometric_grass_and_water.png'
    }, (function() {
        GameEngine.Loader.loadResource({
            type: 'json',
            name: 'map',
            src: '/resources/isometric_example.json'
        }, (function() {

            /**
             *
             * Wait until all resources are loaded before doing anything.
             * TODO: make this better, ie have a callback or something for when all resources are loaded
             *
             */

            var map = new GameEngine.Map('map', GameEngine.Loader.getJSONResource('map'));
            map.addTo(Game.world);

            var Player = function(game, name, positionX, positionY, width, height) {
                GameEngine.Entity.apply(this, arguments);

                Game.viewport.follow(this);
            };

            Player.prototype = Object.create(GameEngine.Entity.prototype);
            Player.constructor = Player;
            Player.prototype.update = function(time) {
                if (this.game.input.isKeyPressed('up')) {
                    this.position.y--;
                } else if (this.game.input.isKeyPressed('down')) {
                    this.position.y++;
                }

                if (this.game.input.isKeyPressed('left')) {
                    this.position.x--;
                } else if (this.game.input.isKeyPressed('right')) {
                    this.position.x++;
                }
            };

            var player = new Player(Game, "Player Name", 400, 600, 32, 32);

            Game.world.addChild(player);

            Game.input.bindKeyAction(Game.input.KEYS.W, 'up');
            Game.input.bindKeyAction(Game.input.KEYS.A, 'left');
            Game.input.bindKeyAction(Game.input.KEYS.S, 'down');
            Game.input.bindKeyAction(Game.input.KEYS.D, 'right');

            // TODO: events are not working as expected. need to rethink and rework
            //var keyDownHandle = GameEngine.Event.subscribe(GameEngine.Event.KEY_DOWN, function(action, keyCode) {
            //    if (action == "up") {
            //        player.position.y--;
            //    } else if (action == "down") {
            //        player.position.y++;
            //    }
            //
            //    if (action == "left") {
            //        player.position.x--;
            //    } else if (action == "right") {
            //        player.position.x++;
            //    }
            //});

            Game.startGameLoop();

        }), function() {
            console.error("Failed to load map json file");
        });
    }), function() {
        console.error("Failed to load map image file");
    });

})();
