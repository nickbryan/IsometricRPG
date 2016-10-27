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