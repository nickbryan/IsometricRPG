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
