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