(function() {

    GameEngine.Math = (function() {
        return {
            /**
             * Restricts a value to be within  a specific range.
             *
             * - If value > max, max will be returned.
             * - If value < min, min will be returned.
             * - If min ≤ value ≥ max, value will be returned.
             *
             * @param val
             * @param min
             * @param max
             * @returns {number}
             */
            clamp: function(val, min, max) {
                return Math.max(min, Math.min(max, val));
            }
        };
    })();

})();