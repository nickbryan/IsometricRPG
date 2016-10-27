(function() {

    /**
     *
     * @class
     * @extends GameEngine.Renderable
     * @param game
     * @param topLeftX
     * @param topLeftY
     * @param bottomRightX
     * @param bottomRightY
     * @returns {GameEngine.ViewPort}
     * @constructor
     */
    GameEngine.ViewPort = function(game, topLeftX, topLeftY, bottomRightX, bottomRightY) {
        GameEngine.Renderable.call(this, topLeftX, topLeftY, (bottomRightX - topLeftX), (bottomRightY - topLeftY));

        this.game = game;

        this.deadZone = new GameEngine.Shapes.Rectangle(0, 0, 0, 0);

        this.target = null;

        this.bounds = new GameEngine.Shapes.Rectangle(-Infinity, -Infinity, Infinity, Infinity);

        this.setDeadZone(this.width / 6, this.height / 6);

        return this;
    };

    GameEngine.ViewPort.prototype = Object.create(GameEngine.Renderable.prototype);

    GameEngine.Helpers.extend(GameEngine.ViewPort.prototype, {

        constructor: GameEngine.ViewPort,

        follow: function(target) {
            if (!(target instanceof GameEngine.Entity)) {
                throw new Error('Follow target is not an instance of GameEngine.Entity');
            }

            this.target = target.position;

            this.updateTarget();

            return this;
        },

        setDeadZone: function(width, height) {
            this.deadZone.translate(
                Math.floor((this.width   - width)  / 2),
                Math.floor(((this.height - height) / 2) - (height * 0.25))
            );

            this.deadZone.resize(width, height);

            return this;
        },

        screenToWorldCoordinates: function(x, y) {
            var vector = new GameEngine.Math.Vector2D(x, y);
            vector.addTo(this.position).subtractFrom(this.game.world.position);

            return vector;
        },

        update: function(elapsedTime) {
            this.updateTarget();
        },

        updateTarget: function() {
            if (this.target !== null) {
                if ((this.target.x - this.position.x) > this.deadZone.right) {
                    this.position.x = Math.floor(Math.min(this.target.x - this.deadZone.right, this.bounds.width - this.width));
                } else if ((this.target.x - this.position.x) < this.deadZone.position.x) {
                    this.position.x = Math.floor(Math.max(this.target.x - this.deadZone.position.x, this.bounds.position.x));
                }


                if ((this.target.y - this.position.y) > this.deadZone.bottom) {
                    this.position.y = Math.floor(Math.min((this.target.y) - this.deadZone.bottom, this.bounds.height - this.height));
                } else if ((this.target.y - this.position.y) < this.deadZone.position.y) {
                    this.position.y = Math.floor(Math.max((this.target.y) - this.deadZone.position.y, this.bounds.position.y));
                }
            }
        },

        worldToScreenCoordinates: function(x, y) {
            var vector = new GameEngine.Math.Vector2D(x, y);
            vector.subtractFrom(this.position).addTo(this.game.world.position);

            return vector;
        }

    }, true);

})();
