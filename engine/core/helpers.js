(function() {
    GameEngine.Helpers = (function() {

        return {

            /**
             * Copies all properties from source to destination.
             *
             * @param {object} Destination Object that properties will be copied to.
             * @param {object} Source Object to copy properties from.
             * @param {bool} [overrideExistingValues=false] If existing values should be overridden.
             * @param {bool} [extendOwnPropertiesOnly=false] If only own properties should be extended (not prototype).
             * @returns {object}
             */
            extend: function (destination, source, overrideExistingValues, extendOwnPropertiesOnly) {
                overrideExistingValues  = overrideExistingValues  || false;
                extendOwnPropertiesOnly = extendOwnPropertiesOnly || false;

                var keys = [];

                if (extendOwnPropertiesOnly)
                    keys = Object.keys(source);
                else {
                    keys = this.getAllKeys(source);
                }

                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];

                    if (overrideExistingValues) {
                        destination[key] = source[key];
                    } else {
                        if (typeof destination[key] === 'undefined') {
                            destination[key] = source[key];
                        }
                    }
                }

                return destination;
            },

            /**
             * Similar to Object.keys() except it gets all keys including prototypes.
             *
             * @param {object} object Object to get keys from.
             * @returns {Array}
             */
            getAllKeys: function(object) {
                if (!this.isObject(object)) {
                    return [];
                }

                var keys = [];

                for (var key in object) {
                    keys.push(key);
                }

                return keys;
            },

            /**
             * Checks if the given object is of type function.
             *
             * @param {object} object Object to check type of.
             * @returns {boolean}
             */
            isFunction: function(object) {
                var type = typeof object;
                return type === 'function' && !!object;
            },

            /**
             * Checks if the given object is of type function or object.
             *
             * @param {object} object Object to check type of.
             * @returns {boolean}
             */
            isObject: function(object) {
                var type = typeof object;
                return type === 'function' || type === 'object' && !!object;
            },

            /**
             * Checks if the given object is of type object.
             *
             * @param {object} object Object to check type of.
             * @returns {boolean}
             */
            isTrueObject: function(object) {
                var type = typeof object;
                return type === 'object' && !!object;
            }
        };

    })();
})();