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