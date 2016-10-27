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