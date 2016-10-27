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