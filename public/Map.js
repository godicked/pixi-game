function Map(resources) {
    PIXI.Container.call(this);
    this.background = new PIXI.extras.TilingSprite();
    this.element = new PIXI.Container();
    this.addChild(this.background);
    this.addChild(this.element);
    this.obstacles = new PIXI.Container();
    this.resources = resources;
    
    var right = new Keyboard(68);
    right.press = function() {
        this.player.speed += 10;
    }.bind(this);
    right.release = function() {
        this.player.speed -= 10;
    }.bind(this);

    var left = new Keyboard(65);
    left.press = function() {
        this.player.speed -= 10;
    }.bind(this);
    left.release = function() {
        this.player.speed += 10;
    }.bind(this);

    var up = new Keyboard(87);
    up.press = function() {
        this.player.jump(150);
    }.bind(this);
    up.release = function() {
    }.bind(this);
    
}
Map.prototype = Object.create(PIXI.Container.prototype);
Map.prototype.loadTest = function() {
    this.background.height = 600;
    this.background.width = 800;
    this.background.texture = this.resources.tiles.texture;
    this.obstacles.addChild(new Rectangle(400, 500, 100, 100));
    this.obstacles.addChild(new Rectangle(150, 400, 100, 200));
    this.obstacles.addChild(new Rectangle(700, 250, 100, 350));
    this.obstacles.addChild(new Rectangle(200, 200, 100, 100));
    this.element.addChild(this.obstacles);
    this.player = new Player(10, 534, this.obstacles);
    this.player.texture = this.resources.cat.texture;
    
    this.element.addChild(this.player);
    this.element.addChild(this.player.portal);
};
Map.prototype.update = function() {
    this.player.update();
    this.center();
};
Map.prototype.click = function(e) {
    this.player.setPortal(e);
};
Map.prototype.center = function() {
    this.element.x = -this.player.x - (this.player.width / 2) + 400;
    this.background.tilePosition.x = -this.player.x;
};

