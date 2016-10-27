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