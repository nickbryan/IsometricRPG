(function() {

    /**
     *
     * @class
     * @extends GameEngine.Renderable
     * @param positionX
     * @param positionY
     * @param width
     * @param height
     * @returns {GameEngine.Container}
     * @constructor
     */
    GameEngine.Container = function(positionX, positionY, width, height) {
        GameEngine.Renderable.call(this, positionX, positionY, width, height);

        /**
         * Indicates if this container is the root container.
         *
         * @type {boolean}
         */
        this.root = false;

        /**
         * Name for this container.
         *
         * @type {string|null}
         */
        this.name = null;

        /**
         * List of all children contained within this container.
         *
         * @type {Array}
         */
        this.children = [];

        this.transformationMatrix = new GameEngine.Math.Matrix2D();

        return this;
    };

    GameEngine.Container.prototype = Object.create(GameEngine.Renderable.prototype);

    GameEngine.Helpers.extend(GameEngine.Container.prototype, {

        constructor: GameEngine.Container,

        /**
         * Add a child to this container.
         *
         * @param {GameEngine.Renderable} child
         */
        addChild: function(child) {
            // TODO: improve this, check for renderable (add update method to renderable incase its not overwritten)

            if (child.container !== null) {
                // Remove from parent container
            }

            child.container = this;

            this.children.push(child);

            return child;
        },

        /**
         * Update all children contained within this container.
         *
         * @param time
         */
        update: function(time) {
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                child.update(time);
            }
        },

        /**
         * Draw all children contained within this container.
         *
         * @param {CanvasRenderingContext2D} renderer
         */
        render: function(renderer, viewport) {
            var restore = false;

            if (this.transformationMatrix.isIdentity()) {
                renderer.translate(this.position.x, this.position.y);
            } else {
                restore = true;
                renderer.save();
                renderer.transform(
                    this.transformationMatrix.matrix[0],
                    this.transformationMatrix.matrix[1],
                    this.transformationMatrix.matrix[3],
                    this.transformationMatrix.matrix[4],
                    this.transformationMatrix.matrix[6],
                    this.transformationMatrix.matrix[7]
                );
            }

            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];

                child.render(renderer, viewport);
            }

            if (restore) {
                renderer.restore();
            } else {
                renderer.translate(-this.position.x, -this.position.y);
            }
        }

    }, true);

})();