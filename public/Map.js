function Map(resources) {
    PIXI.Container.call(this);
    this.obstacles = new PIXI.Container();
    this.resources = resources;
    
    var right = new Keyboard(39);
    right.press = function() {
        this.player.speed += 10;
    }.bind(this);
    right.release = function() {
        this.player.speed -= 10;
    }.bind(this);

    var left = new Keyboard(37);
    left.press = function() {
        this.player.speed -= 10;
    }.bind(this);
    left.release = function() {
        this.player.speed += 10;
    }.bind(this);

    var up = new Keyboard(38);
    up.press = function() {
        this.player.jump(150);
    }.bind(this);
    up.release = function() {
    }.bind(this);
    
}
Map.prototype = Object.create(PIXI.Container.prototype);
Map.prototype.loadTest = function() {
    this.obstacles.addChild(new Rectangle(400, 500, 100, 100));
    this.obstacles.addChild(new Rectangle(150, 400, 100, 200));
    this.obstacles.addChild(new Rectangle(700, 250, 100, 350));
    this.obstacles.addChild(new Rectangle(200, 200, 100, 100));
    this.addChild(this.obstacles);
    this.player = new Player(10, 534, this.obstacles);
    this.player.texture = this.resources.cat.texture;
    this.addChild(this.player.portal);
    this.addChild(this.player);
};
Map.prototype.update = function() {
    this.player.fall();
    this.player.colisionY();
    this.player.move();
    this.player.colisionX();
    this.player.portalColision();
    this.center();
};
Map.prototype.click = function(e) {
    this.player.setPortal(e.x);
};
Map.prototype.center = function() {
    this.x = -this.player.x - (this.player.width / 2) + 400;
};

