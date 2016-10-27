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
