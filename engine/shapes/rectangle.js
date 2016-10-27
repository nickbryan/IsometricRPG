(function() {

    /**
     *
     * @class
     * @param positionX
     * @param positionY
     * @param width
     * @param height
     * @returns {GameEngine.Shapes.Rectangle}
     * @constructor
     */
    GameEngine.Shapes.Rectangle = function(positionX, positionY, width, height) {
        /**
         * A vector containing the position of this rectangle.
         *
         * @type {GameEngine.Math.Vector2D}
         */
        this.position = new GameEngine.Math.Vector2D(positionX, positionY);

        /**
         * Internal width value used for calculations.
         * See this.width object definition at the bottom for how width is returned.
         *
         * @ignore
         * @type {number}
         */
        this._width = width;

        /**
         * Internal height value used for calculations.
         * See this.height object definition at the bottom for how height is returned.
         *
         * @ignore
         * @type {number}
         */
        this._height = height;

        /**
         * The four corners/points that make up this rectangle.
         *
         * @type {Array<GameEngine.Math.Vector2D>}
         */
        this.points = [
            new GameEngine.Math.Vector2D(0, 0),
            new GameEngine.Math.Vector2D(Math.abs(width) == Infinity ? 0 : width, 0),
            new GameEngine.Math.Vector2D(Math.abs(width) == Infinity ? 0 : width, Math.abs(height) == Infinity ? 0 : height),
            new GameEngine.Math.Vector2D(0, Math.abs(height) == Infinity ? 0 : height)
        ];

        /**
         * The direction of each edge of the rectangle relative to each
         * point. If you want to draw an edge from these values, you must
         * first translate to the position of the starting point.
         *
         * @type {Array}
         */
        this.edges = [];

        /**
         * The direction of the normal for each edge of the rectangle, relative
         * to the position of each point. If you want to draw an edge normal,
         * you must first translate to the position of the starting point.
         *
         * @type {Array}
         */
        this.normals = [];

        // Work out edge's and normals
        this.recalculate();

        return this;
    };

    GameEngine.Helpers.extend(GameEngine.Shapes.Rectangle.prototype, {

        /**
         * Set new values for this recangle.
         *
         * @param positionX
         * @param positionY
         * @param width
         * @param height
         * @returns {GameEngine.Shapes.Rectangle}
         */
        set: function(positionX, positionY, width, height) {
            this._width  = width;
            this._height = height;

            this.points[0].set(0, 0);
            this.points[0].set(width, 0);
            this.points[0].set(width, height);
            this.points[0].set(0, height);

            this.recalculate();

            return this;
        },

        /**
         * Resize width and height of this rectangle.
         *
         * @param width
         * @param height
         * @returns {GameEngine.Shapes.Rectangle}
         */
        resize: function(width, height) {
            this.width  = width;
            this.height = height;

            return this;
        },

        /**
         * Recalculate the edges and normals of this rectangle.
         *
         * @returns {GameEngine.Shapes.Rectangle}
         */
        recalculate: function() {
            var length = this.points.length;
            this.edges = [];
            this.normals = [];

            for (var i = 0; i < length; i++) {
                var edge = new GameEngine.Math.Vector2D();
                edge.copy(this.points[(i + 1) % length]).subtractFrom(this.points[i]);
                this.edges.push(edge);

                var normal = new GameEngine.Math.Vector2D();
                normal.copy(edge).makePerpendicular().normalise();
                this.normals.push(normal);
            }

            return this;
        },

        /**
         * Returns a new Rectangle the same as this one.
         *
         * @returns {GameEngine.Shapes.Rectangle}
         */
        clone: function() {
            return new GameEngine.Shapes.Rectangle(this.position.x, this.position.y, this._width, this._height);
        },


        /**
         * Copy the values of the rectangle passed in.
         *
         * @param {GameEngine.Shapes.Rectangle} rectangle
         * @returns {*|GameEngine.Shapes.Rectangle}
         */
        copy: function(rectangle) {
            if (!(rectangle instanceof GameEngine.Shapes.Rectangle)) {
                throw new Error("Cannot copy value that is not an instance of GameEngine.Shapes.Rectangle.");
            }

            return this.set(rectangle.position.x, rectangle.position.y, rectangle.width, rectangle.height);
        },

        /**
         * Translate/Move the rectangle to the given x and y coordinates.
         *
         * @param x
         * @param y
         * @returns {GameEngine.Shapes.Rectangle}
         */
        translate: function(x, y) {
            this.position.x = x;
            this.position.y = y;

            return this;
        },

        /**
         * Translate/Move the rectangle to the position of the passed in vector.
         *
         * @param {GameEngine.Math.Vector2D} vector
         * @returns {GameEngine.Shapes.Rectangle}
         */
        translateVector: function(vector) {
            if (!(vector instanceof GameEngine.Math.Vector2D)) {
                throw new Error("Parameter must be an instance of GameEngine.Math.Vector2D.");
            }

            this.position.x = vector.x;
            this.position.y = vector.y;

            return this;
        },

        /**
         * Merge this rectangle with the passed in rectangle.
         * Sets the width and height to the largest of the two.
         * Sets the position to the position to the smallest of the two.
         *
         * @param {GameEngine.Shapes.Rectangle} rectangle
         * @returns {GameEngine.Shapes.Rectangle}
         */
        mergeWith: function(rectangle) {
            if (!(rectangle instanceof GameEngine.Shapes.Rectangle)) {
                throw new Error("Cannot merge with value that is not an instance of GameEngine.Shapes.Rectangle.");
            }

            var x1 = Math.min(this.left, rectangle.left);
            var y1 = Math.min(this.top,  rectangle.top);

            this.resize(
                Math.max(this.right,  rectangle.right)  - x1,
                Math.max(this.bottom, rectangle.bottom) - y1
            );

            this.position.set(x1, y1);

            return this;
        },

        /**
         * Check if this rectangle intersects the passed in rectangle.
         *
         * @param {GameEngine.Shapes.Rectangle} rectangle
         * @returns {boolean}
         */
        intersects: function(rectangle) {
            if (!(rectangle instanceof GameEngine.Shapes.Rectangle)) {
                throw new Error("Cannot check if rectangle intersects with value that is not an " +
                    "instance of GameEngine.Shapes.Rectangle.");
            }

            return (
                this.left < rectangle.right &&
                rectangle.left < this.right &&
                this.top < rectangle.bottom &&
                rectangle.top < this.bottom
            );
        },

        /**
         * Check if this rectangle contains the passed in rectangle.
         *
         * @param {GameEngine.Shapes.Rectangle} rectangle
         * @returns {boolean}
         */
        contains: function(rectangle) {
            if (!(rectangle instanceof GameEngine.Shapes.Rectangle)) {
                throw new Error("Cannot check value that is not an instance of GameEngine.Shapes.Rectangle.");
            }

            return (
                rectangle.left >= this.left &&
                rectangle.right <= this.right &&
                rectangle.top >= this.top &&
                rectangle.bottom <= this.bottom
            );
        },

        /**
         * Check if this rectangle contains a point.
         *
         * @param x
         * @param y
         * @returns {boolean}
         */
        containsPoint: function (x, y) {
            return (
                x >= this.left &&
                x <= this.right &&
                y >= this.top &&
                y <= this.bottom
            );
        },

        /**
         * Check if this rectangle contains the passed in vector.
         *
         * @param {GameEngine.Math.Vector2D} vector
         * @returns {*|boolean}
         */
        containsPointV: function (vector) {
            if (!(vector instanceof GameEngine.Math.Vector2D)) {
                throw new Error("Parameter must be an instance of GameEngine.Math.Vector2D.");
            }

            return this.containsPoint(vector.x, vector.y);
        }
    }, true);

    /**
     * Redefining some object definitions to make calculation of rectangle coordinates easier.
     *
     * Thanks to melonJs for the idea.
     * {@link https://github.com/melonjs/melonJS/blob/master/src/shapes/rectangle.js}
     */

    /**
     * Coordinate of the top of the rectangle (ie position.y)
     *
     * @type {Number}
     * @name top
     * @memberOf GameEngine.Shapes.Rectangle
     */
    Object.defineProperty(GameEngine.Shapes.Rectangle.prototype, "top", {
        get: function() {
            return this.position.y;
        },
        configurable: true
    });

    /**
     * Coordinate of the right of the rectangle (ie position.x + width)
     *
     * @type {Number}
     * @name right
     * @memberOf GameEngine.Shapes.Rectangle
     */
    Object.defineProperty(GameEngine.Shapes.Rectangle.prototype, "right", {
        get: function() {
            return (this.position.x + this._width) || this._width;
        },
        configurable: true
    });

    /**
     * Coordinate of the bottom of the rectangle (ie position.y + height)
     *
     * @type {Number}
     * @name bottom
     * @memberOf GameEngine.Shapes.Rectangle
     */
    Object.defineProperty(GameEngine.Shapes.Rectangle.prototype, "bottom", {
        get: function() {
            return (this.position.y + this._height) || this._height;
        },
        configurable: true
    });

    /**
     * Coordinate of the left of the rectangle (ie position.x)
     *
     * @type {Number}
     * @name left
     * @memberOf GameEngine.Shapes.Rectangle
     */
    Object.defineProperty(GameEngine.Shapes.Rectangle.prototype, "left", {
        get: function() {
            return this.position.x;
        },
        configurable: true
    });

    /**
     * The width of the rectangle.
     * Takes into consideration recalculation of normals and edge's.
     *
     * @type {Number}
     * @name width
     * @memberOf GameEngine.Shapes.Rectangle
     */
    Object.defineProperty(GameEngine.Shapes.Rectangle.prototype, "width", {
        get: function() {
            return this._width;
        },
        set: function(value) {
            this._width = value;
            this.points[1].x = this.points[2].x = value;
            this.recalculate();
        },
        configurable: true
    });

    /**
     * The height of the rectangle.
     * Takes into consideration recalculation of normals and edge's.
     *
     * @type {Number}
     * @name height
     * @memberOf GameEngine.Shapes.Rectangle
     */
    Object.defineProperty(GameEngine.Shapes.Rectangle.prototype, "height", {
        get: function() {
            return this._height;
        },
        set: function(value) {
            this._height = value;
            this.points[2].y = this.points[3].y = value;
            this.recalculate();
        },
        configurable: true
    });

})();