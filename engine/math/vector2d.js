(function() {

    // TODO: Add additional functionality as needed. Cross product, angles etc.

    /**
     * A 2D Vector class.
     *
     * @param x
     * @param y
     * @constructor
     */
    GameEngine.Math.Vector2D = function(x, y) {
        /**
         * X value of this vector.
         *
         * @type {number}
         */
        this.x = 0;

        /**
         * Y value of this vector.
         *
         * @type {number}
         */
        this.y = 0;

        // Set the initial values of the vector
        this.set(x || 0, y || 0);
    };

    GameEngine.Helpers.extend(GameEngine.Math.Vector2D.prototype, {
        /**
         * Set the X and Y values of the vector.
         *
         * Chainable.
         *
         * @param x
         * @param y
         * @returns {GameEngine.Math.Vector2D}
         */
        set: function(x, y) {
            if (isNaN(x)) {
                throw new Error("Invalid x parameter for vector ["+ x +"]");
            }
            if (isNaN(y)) {
                throw new Error("Invalid y parameter for vector ["+ y +"]");
            }

            this.x = x;

            this.y = y;

            return this;
        },

        /**
         * Returns a new vector with the values of this vector plus the passed in vector.
         *
         * @param {GameEngine.Math.Vector2D} vector
         * @returns {GameEngine.Math.Vector2D}
         */
        add: function(vector) {
            if (!(vector instanceof GameEngine.Math.Vector2D)) {
                throw new Error("Parameter must be an instance of GameEngine.Math.Vector2D.");
            }

            return new GameEngine.Vector2D(this.x + vector.x, this.y + vector.y);
        },

        /**
         * Adds a vector to this vector.
         *
         * Chainable.
         *
         * @param {GameEngine.Math.Vector2D} vector
         * @returns {GameEngine.Math.Vector2D}
         */
        addTo: function(vector) {
            if (!(vector instanceof GameEngine.Math.Vector2D)) {
                throw new Error("Parameter must be an instance of GameEngine.Math.Vector2D.");
            }

            this.x += vector.x;
            this.y += vector.y;

            return this;
        },

        /**
         * Returns a new vector with the values of this vector minus the passed in vector.
         *
         * @param {GameEngine.Math.Vector2D} vector
         * @returns {GameEngine.Math.Vector2D}
         */
        subtract: function(vector) {
            if (!(vector instanceof GameEngine.Math.Vector2D)) {
                throw new Error("Parameter must be an instance of GameEngine.Math.Vector2D.");
            }

            return new GameEngine.Vector2D(this.x - vector.x, this.y - vector.y);
        },

        /**
         * Subtracts a vector from this vector.
         *
         * Chainable.
         *
         * @param {GameEngine.Math.Vector2D} vector
         * @returns {GameEngine.Math.Vector2D}
         */
        subtractFrom: function(vector) {
            if (!(vector instanceof GameEngine.Math.Vector2D)) {
                throw new Error("Parameter must be an instance of GameEngine.Math.Vector2D.");
            }

            this.x -= vector.x;
            this.y -= vector.y;

            return this;
        },

        /**
         * Returns a new vector with the values of this vector multiplied by a scalar value.
         *
         * @param value
         * @returns {GameEngine.Math.Vector2D}
         */
        multiplyScalar: function(value) {
            return new GameEngine.Vector2D(this.x * value, this.y * value);
        },

        /**
         * Multiplies this vector by a scalar value.
         *
         * Chainable.
         *
         * @param value
         * @returns {GameEngine.Math.Vector2D}
         */
        multiplyByScalar: function(value) {
            this.x *= value;
            this.y *= value;

            return this;
        },

        /**
         * Returns a new vector with the values of this vector divided by a scalar value.
         *
         * @param value
         * @returns {GameEngine.Math.Vector2D}
         */
        divideScalar: function(value) {
            return new GameEngine.Vector2D(this.x / value, this.y / value);
        },

        /**
         * Divides this vector by a scalar value.
         *
         * Chainable.
         *
         * @param value
         * @returns {GameEngine.Math.Vector2D}
         */
        divideByScalar: function(value) {
            this.x /= value;
            this.y /= value;

            return this;
        },

        /**
         * Inverts the X value of this vector.
         *
         * Chainable.
         *
         * @returns {GameEngine.Math.Vector2D}
         */
        invertX: function() {
            this.x *= -1;

            return this;
        },

        /**
         * Inverts the Y value of this vector.
         *
         * Chainable.
         *
         * @returns {GameEngine.Math.Vector2D}
         */
        invertY: function() {
            this.y *= -1;

            return this;
        },

        /**
         * Inverts both the X and the Y values of this vector.
         *
         * Chainable.
         *
         * @returns {GameEngine.Math.Vector2D}
         */
        invert: function() {
            this.invertX();
            this.invertY();

            return this;
        },

        /**
         * Copy the values of the passed in vector.
         *
         * @param {GameEngine.Math.Vector2D} vector
         * @returns {GameEngine.Math.Vector2D}
         */
        copy: function(vector) {
            if (!(vector instanceof GameEngine.Math.Vector2D)) {
                throw new Error("Parameter must be an instance of GameEngine.Math.Vector2D.");
            }

            return this.set(vector.x, vector.y);
        },

        /**
         * Makes this vector perpendicular to what it is currently set.
         * (Rotate 90 degrees in a clockwise direction)
         *
         * @returns {GameEngine.Math.Vector2D}
         */
        makePerpendicular: function() {
            return this.set(this.y, -this.x);
        },

        /**
         * Reset this vectors values to zero.
         *
         * @returns {*|GameEngine.Math.Vector2D}
         */
        zero: function() {
            return this.set(0, 0);
        },

        /**
         * Return the square length of this vector.
         *
         * @returns {number}
         */
        lengthSquare: function() {
            return (this.x * this.x) + (this.y * this.y);
        },

        /**
         * Return the length/magnitude of this vector.
         *
         * @returns {number}
         */
        length: function() {
            return Math.sqrt(this.lengthSquare());
        },

        /**
         * Scale this vector so that its magnitude is 1.
         *
         * @returns {GameEngine.Math.Vector2D}
         */
        normalise: function() {
            var length = this.length();

            if (length === 0) {
                this.x = 1;
                this.y = 0;

                return this;
            }

            return this.divideByScalar(length);
        },

        floorSelf: function() {
            return this.set(Math.floor(this.x), Math.floor(this.y));
        },

        ceilSelf: function() {
            return this.set(Math.ceil(this.x), Math.ceil(this.y));
        }
    }, true);

    /**
     * Alias for GameEngine.Math.Vector2D.length()
     *
     * @returns {number}
     */
    GameEngine.Math.Vector2D.prototype.magnitude = GameEngine.Math.Vector2D.prototype.length;

})();