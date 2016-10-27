(function() {

    /**
     *
     * @class
     * @extends GameEngine.Shapes.Rectangle
     * @param positionX
     * @param positionY
     * @param width
     * @param height
     * @returns {GameEngine.Renderable}
     * @constructor
     */
    GameEngine.Renderable = function(positionX, positionY, width, height) {
        GameEngine.Shapes.Rectangle.call(this, positionX, positionY, width, height);

        this.GUID = null;

        this.inViewport = false;

        this.container = null;

        this.worldPosition = new GameEngine.Math.Vector2D(positionX, positionY);

        return this;
    };

    GameEngine.Renderable.prototype = Object.create(GameEngine.Shapes.Rectangle.prototype);

    GameEngine.Helpers.extend(GameEngine.Renderable.prototype, {

        constructor: GameEngine.Renderable,

        update: function(time) {
            // To be extended
        },

        render: function(renderer) {
            // To be extended
        }

    }, true);

})();
