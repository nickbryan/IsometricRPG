(function() {

    /**
     *
     * @class
     * @extends GameEngine.Renderable
     * @param game
     * @param name
     * @param positionX
     * @param positionY
     * @param width
     * @param height
     * @returns {GameEngine.Entity}
     * @constructor
     */
    GameEngine.Entity = function(game, name, positionX, positionY, width, height) {
        GameEngine.Renderable.call(this, positionX, positionY, width, height);

        this.game = game;

        this.name = name;

        this.alive = true;

        return this;
    };

    GameEngine.Entity.prototype = Object.create(GameEngine.Renderable.prototype);

    GameEngine.Helpers.extend(GameEngine.Entity.prototype, {

        constructor: GameEngine.Entity,

        update: function(time) {

        },

        /**
         *
         * @param {CanvasRenderingContext2D} renderer
         */
        render: function(renderer, viewport) {
            renderer.fillStyle = "white";
            renderer.fillRect(this.position.x, this.position.y, this.width, this.height);
        }

    }, true);

})();