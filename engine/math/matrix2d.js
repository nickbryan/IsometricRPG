(function() {

    GameEngine.Math.Matrix2D = function() {

        this.matrix = new Float32Array(9);

        this.identity();

    };

    GameEngine.Helpers.extend(GameEngine.Math.Matrix2D.prototype, {

        identity: function() {
            this.set(
               1, 0, 0,
               0, 1, 0,
               0, 0, 1
            );

            return this;
        },

        set: function() {
            if (arguments.length !== 9) {
                throw new Error("Invalid number of arguments for matrix.");
            }

            for (var i = 0; i < arguments.length; i++) {
                this.matrix[i] = arguments[i];
            }

            return this;
        },

        translate: function(x, y) {
            this.matrix[6] += (x * this.matrix[0]) + (y * this.matrix[3]);
            this.matrix[7] += (x * this.matrix[1]) + (y * this.matrix[4]);

            return this;
        },

        isIdentity : function () {
            return (
                this.matrix[0] === 1 &&
                this.matrix[1] === 0 &&
                this.matrix[2] === 0 &&
                this.matrix[3] === 0 &&
                this.matrix[4] === 1 &&
                this.matrix[5] === 0 &&
                this.matrix[6] === 0 &&
                this.matrix[7] === 0 &&
                this.matrix[8] === 1
            );
        },

    }, true);

})();