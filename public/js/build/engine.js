(function() {
    if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];

        for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
            window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame  = window[vendors[i] + 'CancelAnimationFrame'] ||
                window[vendors[i] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame && !!window.setTimeout) {
            window.requestAnimationFrame = function(callback) {
                var currentTime = Date.now();
                var timeToCall = Math.max(0, 16 - (currentTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currentTime + timeToCall);
                }, timeToCall);
                lastTime = currentTime - timeToCall;
                return id;
            };
        }

        if (!window.cancelAnimationFrame && !!window.clearTimeout) {
            window.cancelAnimationFrame = function(id) {
                window.clearTimeout(id);
            };
        }
    }
})();

(function() {
    if (!window.performance) {
        window.performance = {};
    }

    if (!window.performance.now) {
        var start = Date.now();
        window.performance.now = function() {
            return Date.now() - start;
        };
    }
})();
(function() {
    /**
     * Create the global namespace for the game engine.
     *
     * @type {object}
     */
    window.GameEngine = window.GameEngine || {};

    /**
     * Engine version.
     *
     * @type {string}
     */
    GameEngine.VERSION = '0.1.0';
})();

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
(function() {

    // TODO: Decide what to do about aspect ratio's and what the base screen size should be.
    GameEngine.Renderer = function(screenWidth, screenHeight, useDoubleBuffering) {
        this.scaleRatio = new GameEngine.Math.Vector2D();

        this.canvas = this.createCanvas(screenWidth, screenHeight);

        this.wrapper = document.getElementById('game-screen');
        this.wrapper.appendChild(this.canvas);

        this.context = this.canvas.getContext('2d');

        this.scaleRatio.set(
            this.canvas.width  / this.canvas.offsetWidth,
            this.canvas.height / this.canvas.offsetHeight
        );

        this.doubleBufferingEnabled = useDoubleBuffering || false;
        if (this.doubleBufferingEnabled) {
            this.backBuffer        = this.createCanvas(screenWidth, screenHeight);
            this.backBufferContext = this.backBuffer.getContext('2d');
        } else {
            this.backBuffer        = this.canvas;
            this.backBufferContext = this.context;
        }

        return this;
    };

    GameEngine.Helpers.extend(GameEngine.Renderer.prototype, {
        /**
         * Creates a canvas element and calculates the aspect ratio.
         *
         * http://www.sitepoint.com/modernize-your-html5-canvas-game/
         *
         * @param width
         * @param height
         * @returns {Element}
         */
        createCanvas: function(width, height) {
            if (width === 0 || height === 0) {
                throw Error("Width and height need to be greater than zero for canvas creation.");
            }

            var canvas = document.createElement('canvas');
            canvas.width  = width  || this.canvas.width;
            canvas.height = height || this.canvas.height;

            var scaleToFitX = window.innerWidth  / width;
            var scaleToFitY = window.innerHeight / height;

            var currentScreenRation = window.innerWidth / window.innerHeight;
            var optimalRatio        = Math.min(scaleToFitX, scaleToFitY);

            if (currentScreenRation >= 1.77 && currentScreenRation <= 1.79) {
                canvas.style.width  = window.innerWidth  + "px";
                canvas.style.height = window.innerHeight + "px";
            } else {
                canvas.style.width  = width  * optimalRatio + "px";
                canvas.style.height = height * optimalRatio + "px";
            }

            return canvas;
        },

        /**
         * Returns the canvas context.
         *
         * @returns {*|CanvasRenderingContext2D}
         */
        getContext: function() {
            return this.backBufferContext;
        },

        /**
         * Clear the canvas.
         *
         * @param clearColor
         * @returns {GameEngine.Renderer}
         */
        clearScreen: function(clearColor) {
            this.backBufferContext.save();
            this.backBufferContext.setTransform(1, 0, 0, 1, 0, 0);
            this.backBufferContext.fillStyle = clearColor || 'black';
            this.backBufferContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.backBufferContext.restore();

            return this;
        },

        /**
         * Draw the current front buffer to the canvas.
         *
         * @returns {GameEngine.Renderer}
         */
        drawFrontBuffer: function() {
            this.context.drawImage(this.backBuffer, 0, 0);

            return this;
        }

    }, true);

})();
(function() {

    // Based on https://github.com/daniellmb/MinPubSub
    GameEngine.Event = (function() {

        var subscriberCache = {};

        return {

            KEY_UP: 'GameEngine.input.keyup',

            KEY_DOWN: 'GameEngine.input.keydown',

            publish: function(channel, parameters) {
                var subscribers     = subscriberCache[channel];
                var subscriberCount = subscribers ? subscribers.length : 0;

                while (subscriberCount--) {
                    subscribers[subscriberCount].apply(window, parameters || []);
                }
            },

            subscribe: function(topic, callback) {
                if (!subscriberCache[topic]) {
                    subscriberCache[topic] = [];
                }

                subscriberCache[topic].push(callback);
                return {
                    topic:    topic,
                    callback: callback
                };
            },

            unsubscribe: function(handle) {
                var subscribers     = subscriberCache[handle.topic];
                var callback        = handle.callback;
                var subscriberCount = subscribers ? subscribers.length : 0;

                while(subscriberCount--) {
                    if (subscribers[subscriberCount] === callback) {
                        subscribers.splice(subscriberCount, 1);
                    }
                }
            }
        };
    })();

})();

(function() {

    GameEngine.Loader = (function() {

        var loadedImages = {};

        var loadedJSONFiles = {};

        var resourceCount = 0;

        function loadImage(resource, onLoadSuccess, onLoadError) {
            loadedImages[resource.name] = new Image();
            loadedImages[resource.name].onload = onLoadSuccess;
            loadedImages[resource.name].onerror = onLoadError;
            loadedImages[resource.name].src = resource.src;
        }

        function loadJSONFile(resource, onLoadSuccess, onLoadError) {
            var xhr = new XMLHttpRequest();

            if (xhr.overrideMimeType) {
                xhr.overrideMimeType("application/json");
            }

            // TODO: enable nocache
            xhr.open("GET", resource.src, true);

            xhr.ontimeout = onLoadError;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    // TODO: test this
                    // status = 0 when file protocol is used, or cross-domain origin,
                    // (With Chrome use "--allow-file-access-from-files --disable-web-security")
                    if ((xhr.status === 200) || ((xhr.status === 0) && xhr.responseText)) {
                        loadedJSONFiles[resource.name] = JSON.parse(xhr.responseText);
                        onLoadSuccess();
                    }
                    else {
                        onLoadError();
                    }
                }
            };

            xhr.send(null);
        }


        return {

            loadResource: function(resource, onLoadSuccess, onLoadError) {
                switch (resource.type) {
                    case 'json':
                        //TODO: loadJSONFile.call()?
                        loadJSONFile(resource, onLoadSuccess, onLoadError);

                        return true;

                    case 'image':
                        loadImage(resource, onLoadSuccess, onLoadError);

                        return true;
                    default:
                        throw new Error("Unknown resource type " + resource.type + ".");
                }
            },

            getJSONResource: function(resourceName) {
                resourceName = "" + resourceName;

                if (resourceName in loadedJSONFiles) {
                    return loadedJSONFiles[resourceName];
                }

                return null;
            },

            getImage: function(imageName) {
                imageName = "" + imageName;

                if (imageName in loadedImages) {
                    return loadedImages[imageName];
                }

                return null;
            }

        };

    })();

})();
(function() {

    /**
     * Default keyName => keyCode mappings.
     *
     * @ignore
     * @type {Object}
     */
    var keys = {
        "BACKSPACE": 8,
        "TAB": 9,
        "ENTER" : 13,
        "SHIFT": 16,
        "CTRL": 17,
        "ALT": 18,
        "PAUSE": 19,
        "CAPS_LOCK" : 20,
        "ESC": 27,
        "SPACE": 32,
        "PAGE_UP": 33,
        "PAGE_DOWN": 34,
        "END" : 35,
        "HOME": 36,
        "LEFT": 37,
        "UP": 38,
        "RIGHT": 39,
        "DOWN" : 40,
        "PRINT_SCREEN": 42,
        "INSERT": 45,
        "DELETE": 46,
        "NUM0": 48,
        "NUM1" : 49,
        "NUM2": 50,
        "NUM3": 51,
        "NUM4": 52,
        "NUM5": 53,
        "NUM6" : 54,
        "NUM7": 55,
        "NUM8": 56,
        "NUM9": 57,
        "A": 65,
        "B" : 66,
        "C": 67,
        "D": 68,
        "E": 69,
        "F": 70,
        "G" : 71,
        "H": 72,
        "I": 73,
        "J": 74,
        "K": 75,
        "L" : 76,
        "M": 77,
        "N": 78,
        "O": 79,
        "P": 80,
        "Q" : 81,
        "R": 82,
        "S": 83,
        "T": 84,
        "U": 85,
        "V" : 86,
        "W": 87,
        "X": 88,
        "Y": 89,
        "Z": 90,
        "WINDOW_KEY" : 91,
        "NUMPAD0": 96,
        "NUMPAD1": 97,
        "NUMPAD2": 98,
        "NUMPAD3": 99,
        "NUMPAD4" : 100,
        "NUMPAD5": 101,
        "NUMPAD6": 102,
        "NUMPAD7": 103,
        "NUMPAD8": 104,
        "NUMPAD9" : 105,
        "MULTIPLY": 106,
        "ADD": 107,
        "SUBSTRACT": 109,
        "DECIMAL": 110,
        "DIVIDE" : 111,
        "F1": 112,
        "F2": 113,
        "F3": 114,
        "F4": 115,
        "F5" : 116,
        "F6": 117,
        "F7": 118,
        "F8": 119,
        "F9": 120,
        "F10" : 121,
        "F11": 122,
        "F12": 123,
        "NUM_LOCK": 144,
        "SCROLL_LOCK": 145,
        "SEMICOLON" : 186,
        "PLUS": 187,
        "COMMA": 188,
        "MINUS": 189,
        "PERIOD": 190,
        "FORWAND_SLASH" : 191,
        "GRAVE_ACCENT": 192,
        "OPEN_BRACKET": 219,
        "BACK_SLASH": 220,
        "CLOSE_BRACKET": 221,
        "SINGLE_QUOTE": 222
    };

    GameEngine.Input = function() {

        /**
         * Holds a list of all key codes in a readable form.
         *
         * @constant
         * @type {Object}
         */
        this.KEYS = keys;

        /**
         * Used to keep track of all user bound key actions.
         *
         * @ignore
         * @type {Object}
         */
        this.boundKeys = {};

        /**
         * Used to keep track of all keys pressed.
         *
         * @ignore
         * @type {Object}
         */
        this.keyPressed = {};

        /**
         * Used to keep track of which keys we need to prevent default actions on.
         *
         * @ignore
         * @type {Object}
         */
        this.preventDefaultForBoundKeys = {};

        /**
         * Default global value for preventing default actions on events.
         * Will be used if prevent is not set on bind.
         *
         * @type {Boolean}
         */
        this.preventDefault = true;

        // Add the keyboard event listeners and assign our callbacks to them
        window.addEventListener('keydown', this.keyDownCallback.bind(this), false);
        window.addEventListener('keyup', this.keyUpCallback.bind(this), false);
    };

    GameEngine.Helpers.extend(GameEngine.Input.prototype, {

        bindKeyAction: function(keyCode, action, preventDefault) {
            // Set the prevent default to the global default if its not passed
            if (typeof preventDefault !== 'boolean') {
                preventDefault = this.preventDefault;
            }

            this.boundKeys[keyCode] = action;
            this.preventDefaultForBoundKeys[keyCode] = preventDefault;
            this.keyPressed[action] = false;
        },

        keyDownCallback: function(event) {
            var keyCode = event.keyCode || event.which;
            var action  = this.boundKeys[keyCode];

            GameEngine.Event.publish(GameEngine.Event.KEY_DOWN, [action, keyCode]);

            // If this key has an action bound to it
            if (!!action) {
                // Update the key status so we can track what the current state of this key is later
                this.keyPressed[action] = true;

                // Prevent default for this key if required
                if (this.preventDefaultForBoundKeys[keyCode]) {
                    return this.preventDefaultAction(event);
                }
            }

            return true;
        },

        keyUpCallback: function(event) {
            var keyCode = event.keyCode || event.which;
            var action  = this.boundKeys[keyCode];

            GameEngine.Event.publish(GameEngine.Event.KEY_UP, [action, keyCode]);

            // If this key has an action bound to it
            if (!!action) {
                // Update the key status so we can track what the current state of this key is later
                this.keyPressed[action] = false;

                // Prevent default for this key if required
                if (this.preventDefaultForBoundKeys[keyCode]) {
                    return this.preventDefaultAction(event);
                }
            }

            return true;
        },

        isKeyPressed: function(action) {
            return this.keyPressed[action];
        },

        preventDefaultAction: function(event) {
            // Stop event propagation
            if (!!event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }

            // Stop event default
            if (!!event.preventDefault) {
                event.preventDefault();
            } else  {
                event.returnValue = false;
            }

            return false;
        }

    }, true);

})();
(function() {

    GameEngine.Shapes = GameEngine.Shapes || {};

})();
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

(function() {

    GameEngine.IsometricRenderer = function(columns, rows, tileWidth, tileHeight) {
        this.columns = columns;
        this.rows = rows;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.hTileWidth = tileWidth / 2;
        this.hTileHeight = tileHeight / 2;
        this.originX = this.rows * this.hTileWidth;
    };

    GameEngine.Helpers.extend(GameEngine.IsometricRenderer.prototype, {


        pixelToTileCoordinates: function(x, y, vector) {
            var vec = vector || new GameEngine.Math.Vector2D();

            return vec.set(
                this.pixelToTileX(x, y),
                this.pixelToTileY(y, x)
            );
        },

        pixelToTileX: function(x, y) {
            return (y / this.tileHeight) + ((x - this.originX) / this.tileWidth);
        },

        pixelToTileY: function(y, x) {
            return (y / this.tileHeight) - ((x - this.originX) / this.tileWidth);
        },

        tileToPixelCoordinates : function (x, y, vector) {
            var vec = vector || new GameEngine.Math.Vector2D();
            return vec.set(
                (x - y) * this.hTileWidth + this.originX,
                (x + y) * this.hTileHeight
            );
        },

        /**
         *
         * @param {GameEngine.Renderer} renderer
         * @param {GameEngine.Layer}    layer
         * @param {GameEngine.Viewport} viewport
         */
        render: function(renderer, layer, viewport) {
            /** @var {GameEngine.TileSet} tileset */
            var tileset = layer.tileSet;
            var offset  = tileset.tileOffset;


            var rowIterator = this.pixelToTileCoordinates(
                viewport.position.x - tileset.tileWidth,
                viewport.position.y  - tileset.tileHeight
            ).floorSelf();

            var tileEnd = this.pixelToTileCoordinates(
                viewport.position.x + viewport.width  + tileset.tileWidth,
                viewport.position.y + viewport.height + tileset.tileHeight
            ).ceilSelf();

            var viewportEnd = this.tileToPixelCoordinates(tileEnd.x, tileEnd.y);


            var startPosition = this.tileToPixelCoordinates(rowIterator.x, rowIterator.y);
            startPosition.x -= this.hTileWidth;
            startPosition.y += this.tileHeight;

            var inUpperHalf = startPosition.y - viewport.position.y > this.hTileHeight;
            var inLeftHalf  = viewport.position.x - startPosition.x < this.hTileWidth;

            if (inUpperHalf) {
                if (inLeftHalf) {
                    rowIterator.x--;
                    startPosition.x -= this.hTileWidth;
                } else {
                    rowIterator.y--;
                    startPosition.x += this.hTileWidth;
                }
                startPosition.y -= this.hTileHeight;
            }

            var shifted = (inUpperHalf && !inLeftHalf) || (!inUpperHalf && inLeftHalf);

            var columnIterator = new GameEngine.Math.Vector2D(rowIterator.x, rowIterator.y);

            for (var y = startPosition.y * 2; y - this.tileHeight * 2 < viewportEnd.y * 2; y += this.tileHeight) {
                columnIterator.set(rowIterator.x, rowIterator.y);
                for (var x = startPosition.x; x < viewportEnd.x; x += this.tileWidth) {
                    if (columnIterator.x >= 0 && columnIterator.y >= 0 && columnIterator.x < this.columns &&
                        columnIterator.y < this.rows) {
                        var tile = layer.layerData[columnIterator.x][columnIterator.y];
                        if (tile) {
                            tileset = tile.tileSet;

                            offset = tileset.tileOffset;

                            tileset.drawTile(renderer, offset.x + x, offset.y + y / 2 - tileset.tileHeight, tile);
                        }
                    }

                    columnIterator.x++;
                    columnIterator.y--;
                }

                if (!shifted) {
                    rowIterator.x++;
                    startPosition.x += this.hTileWidth;
                    shifted = true;
                }
                else {
                    rowIterator.y++;
                    startPosition.x -= this.hTileWidth;
                    shifted = false;
                }
            }

        }

    }, true);

})();

(function() {

    GameEngine.Tile = function(x, y, gid, tileset) {
        GameEngine.Shapes.Rectangle.call(
            this,
            x * tileset.tilewidth,
            y * tileset.tileheight,
            tileset.tilewidth,
            tileset.tileheight
        );

        this.tileSet = tileset;

        this.column = x;
        this.row = y;

        this.tileID = gid;
    };

    GameEngine.Tile.prototype = Object.create(GameEngine.Shapes.Rectangle.prototype);

    GameEngine.Helpers.extend(GameEngine.Tile.prototype, {

        constructor: GameEngine.Tile

    }, true);

})();

(function() {

    GameEngine.Layer = function(layer, tileWidth, tileHeight, tilesets) {
        GameEngine.Renderable.call(this, 0, 0, 0, 0);

        this.name = layer.name;
        this.columns = layer.width;
        this.rows = layer.height;

        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.tileSets = tilesets;

        this.width = (this.columns + this.rows) * (this.tileWidth / 2);
        this.height = (this.columns + this.rows) * (this.tileHeight / 2);

        this.tileSet = this.tileSets[0];

        this.layerData = [];
        for (var x = 0; x < this.columns; x++) {
            this.layerData[x] = [];
            for (var y = 0; y < this.rows; y++) {
                this.layerData[x][y] = null;
            }
        }

        this.maxTileSize = {
            width:  0,
            height: 0
        };

        for (var tileSetIndex = 0; tileSetIndex < this.tileSets.length; tileSetIndex++) {
            var tileSet = this.tileSets[tileSetIndex];
            this.maxTileSize.width = Math.max(this.maxTileSize.width, tileSet.tileWidth);
            this.maxTileSize.height = Math.max(this.maxTileSize.height, tileSet.tileHeight);
        }

        this.renderer = new GameEngine.IsometricRenderer(this.columns, this.rows, this.tileWidth, this.tileHeight);

        this.setLayerData(layer.data);
    };

    GameEngine.Layer.prototype = Object.create(GameEngine.Renderable.prototype);

    GameEngine.Helpers.extend(GameEngine.Layer.prototype, {

        constructor: GameEngine.Layer,

        setLayerData: function(data) {
            var index = 0;
            // set everything
            for (var y = 0 ; y < this.rows; y++) {
                for (var x = 0; x < this.columns; x++) {
                    // get the value of the gid
                    var gid = data[index++];
                    // fill the array
                    if (gid !== 0) {
                        // add a new tile to the layer
                        this.layerData[x][y] = new GameEngine.Tile(x, y, gid, this.tileSet);
                    }
                }
            }
        },

        render: function(renderer, viewport) {
            this.renderer.render(renderer, this, viewport);
        }

    }, true);

})();
(function() {

    GameEngine.TileSet = function(tileSetData) {
        this.name = tileSetData.name;
        this.tileWidth = tileSetData.tilewidth;
        this.tileHeight = tileSetData.tileheight;
        this.spacing = tileSetData.spacing || 0;
        this.margin = tileSetData.margin || 0;

        this.tileOffset = new GameEngine.Math.Vector2D();

        var offset = tileSetData.tileoffset;
        if (!!offset) {
            this.tileOffset.x = offset.x;
            this.tileOffset.y = offset.y;
        }

        this.image = GameEngine.Loader.getImage(tileSetData.image);
        if (this.image === null) {
            throw Error(tileSetData.image + ' cannot be found.');
        }

        this.horizontalTileCount = tileSetData.columns || Math.floor(this.image.width / (this.tileWidth + this.spacing));
        this.verticalTileCount = Math.floor(this.image.height / (this.tileHeight + this.spacing));

        this.firstGID = tileSetData.firstgid;
        this.lastGID = this.firstGID + (((this.horizontalTileCount * this.verticalTileCount) - 1) || 0);

        if (tileSetData.tilecount && this.lastGID - this.firstGID + 1 !== +tileSetData.tilecount) {
            console.warn(
                "Computed tilecount (" + (this.lastGID - this.firstGID + 1) +
                ") does not match expected tilecount (" + tileSetData.tilecount + ")"
            );
        }
    };

    GameEngine.Helpers.extend(GameEngine.TileSet.prototype, {

        drawTile: function(renderer, x, y, tile) {
            renderer.drawImage(
                this.image,
                this.tileOffset.x, this.tileOffset.y,
                this.tileWidth, this.tileHeight,
                x, y,
                this.tileWidth, this.tileHeight
            );
        }

    }, true);

})();
(function() {

    GameEngine.Map = function(mapName, mapData) {
        this.name = mapName;

        this.data = mapData;

        this.columns = mapData.width;

        this.rows = mapData.height;

        this.tileWidth = mapData.tilewidth;

        this.tileHeight = mapData.tileheight;

        this.tileSets = [];

        this.layers = [];

        this.width = (this.columns + this.rows) * (this.tileWidth / 2);

        this.height = (this.columns + this.rows) * (this.tileHeight / 2);

        this.zIndex = 0;

        this.load();
    };

    GameEngine.Helpers.extend(GameEngine.Map.prototype, {

        load: function() {
            for (var tileSet = 0; tileSet < this.data.tilesets.length; tileSet++) {
                var currentTileSet = this.data.tilesets[tileSet];

                this.tileSets.push(new GameEngine.TileSet(currentTileSet));
            }


            for (var layer = 0; layer < this.data.layers.length; layer++) {
                var currentLayer = this.data.layers[layer];

                switch (currentLayer.type) {
                    case 'tilelayer':
                        this.layers.push(new GameEngine.Layer(currentLayer, this.tileWidth, this.tileHeight, this.tileSets));
                        break;
                    default :
                        throw Error(currentLayer.type + ' has not been implemented as a layer type yet.');
                }
            }
        },

        addTo: function(container) {
            for (var layer = 0; layer < this.layers.length; layer++) {
                var currentLayer = this.layers[layer];

                container.addChild(currentLayer);
            }
        }

    }, true);

})();
(function() {

    GameEngine.Game = function(screenWidth, screenHeight) {
        /**
         * Used to keep track of the requestAnimationFrame ID.
         *
         * @type {number}
         */
        this.animationFrameId = -1;

        /**
         * Games instance of the input object.
         *
         * @type {GameEngine.Input}
         */
        this.input = new GameEngine.Input();

        /**
         * Games instance of the renderer.
         *
         * @type {GameEngine.Renderer}
         */
        this.renderer = new GameEngine.Renderer(screenWidth, screenHeight);

        /**
         * A reference to the games main viewport.
         *
         * @type {GameEngine.ViewPort}
         */
        this.viewport = new GameEngine.ViewPort(this, 0, 0, screenWidth, screenHeight);

        /**
         * A reference to the games world container.
         * This is the root and should contain all game objects.
         *
         * @type {GameEngine.Container}
         */
        this.world = new GameEngine.Container(0, 0, screenWidth, screenHeight);

        // Set the world container name
        this.world.name = "gameWorldContainer";

        // Make sure we set our world container as the root.
        this.world.root = true;

    };

    GameEngine.Helpers.extend(GameEngine.Game.prototype, {



        /**
         * The game loop callback triggered by requestAnimationFrame.
         *
         * @param telapsedTimeime
         * @returns {GameEngine.Game}
         */
        gameLoop: function(elapsedTime) {
            this.update(elapsedTime);
            this.render();

            if (this.animationFrameId !== -1) {
                this.animationFrameId = window.requestAnimationFrame(this.gameLoop.bind(this));
            }

            return this;
        },

        /**
         * Called each frame. All render calls should be done in here.
         *
         * @returns {GameEngine.Game}
         */
        render: function() {
            this.renderer.clearScreen('#0d3349');

            this.world.transformationMatrix.translate(-this.viewport.position.x, -this.viewport.position.y);

            this.world.render(this.renderer.getContext(), this.viewport);

            this.renderer.drawFrontBuffer();

            this.world.transformationMatrix.translate(this.viewport.position.x, this.viewport.position.y);

            return this;
        },

        /**
         * Start of the game loop.
         *
         * @returns {GameEngine.Game}
         */
        startGameLoop: function() {
            // Check that the loop hasn't already been started
            if (this.animationFrameId === -1) {
                this.animationFrameId = window.requestAnimationFrame(this.gameLoop.bind(this));
            }

            return this;
        },

        /**
         * Stop the game loop.
         *
         * @returns {GameEngine.Game}
         */
        stopGameLoop: function() {
            window.cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = -1;

            return this;
        },

        /**
         * Called each frame. All update calls should be done in here.
         *
         * @param elapsedTime
         * @returns {GameEngine.Game}
         */
        update: function(elapsedTime) {

            this.world.update(elapsedTime);
            this.viewport.update(elapsedTime);

            return this;
        }

    }, true);

})();