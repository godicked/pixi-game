function Map(gravity) {
    PIXI.DisplayObjectContainer.call(this);
    this.g = gravity;
    this.platforms = [];
    this.portal;
    this.player;
    
    var right = new Keyboard(39);
    
    right.press = function() {
        this.player.vx += 10;
    }.bind(this);
    
    right.release = function() {
        this.player.vx -= 10;
    }.bind(this);
    
    var left = new Keyboard(37);
    left.press = function() {
        this.player.vx -= 10;
    }.bind(this);
    
    left.release = function() {
        this.player.vx += 10;
    }.bind(this);
    
    var up = new Keyboard(38);
    up.press = function() {
        this.player.jump();
    }.bind(this);
    
    up.release = function() {
    }.bind(this);
}

Map.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

Map.prototype.setPlayer = function(player) {
    this.player = player;
    this.portal = new Portal(400,695);
    //this.portal.visible = false;
};

Map.prototype.draw = function() {
    this.addChild(this.portal);
    this.addChild(this.player);
};

Map.prototype.update = function() {
    if(colision(this.player, this.portal) && this.portal.visible) {
        this.player.onPortal = true;
        this.portal.visible = false;
    }
    else {
        this.player.onPortal = false;
    }
    
    this.player.update();
};

Map.prototype.getClick = function(x) {
    this.portal.x= x;
    this.portal.visible = true;
};

function colision(obj1, obj2) {
    if(obj1.x + obj1.width > obj2.x && obj1.x < obj2.x + obj2.width && obj1.y == 636) {
        return true;
    }
    else {
        return false;
    }
}