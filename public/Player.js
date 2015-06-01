
function Player(x, y, obstacles) {
    PIXI.Sprite.call(this);
    this.obstacles = obstacles
    this.images = {};
    this.x = x;
    this.y = y;
    this.speed = 0;
    
    this.time = 0;
    this.savedY = this.y;
    this.lastY = this.y;
    this.jumpForce = 0;
    this.g = 40;
    this.isFalling = false;
    
    this.portal = new Portal();
    //this.portal.visible = false;
}
Player.prototype = Object.create(PIXI.Sprite.prototype);
Player.prototype.addImage = function(texture, name){
    this.images[name] = texture;
};
Player.prototype.setImage = function(name) {
    this.texture = this.images[name];
};
Player.prototype.move = function() {
    this.x += this.speed;
};
Player.prototype.fall = function() {
    if (this.isFalling) {
        this.lastY = this.y;
        this.time += 0.1;
        this.y = this.savedY-((-this.g*this.time*this.time) + (this.jumpForce * this.time));
        this.y = Math.ceil(this.y);
    }
};
Player.prototype.jump = function(force) {
    if(!this.isFalling){
        this.isFalling = true;
        this.jumpForce = force;
        this.time = 0;
        this.savedY = this.y;
    }
};
Player.prototype.forceJump = function(n) {
    this.isFalling = false;
    this.jump(n);
};
Player.prototype.colisionX = function() {
    var elem = this.obstacles.children;
    var l = elem.length;
    for (i = 0; i < l; i+=1) {
        if(colision(this, elem[i])) {
            if(this.speed >= 0) {
                var offset = this.x + this.width - elem[i].x;
                this.x -= offset;
            }
            else{
                var offset = elem[i].x + elem[i].width - this.x;
                this.x += offset;
            }
        }
    }
};
Player.prototype.colisionY = function() {
    if(this.y + this.height >= 600) {
        this.isFalling = false;
        this.y = 600 - this.height;
    }
    else {
        var elem = this.obstacles.children;
        var l = elem.length;
        var colided = false;
        for (i = 0; i < l; i+=1) {
            if(colision(this, elem[i])) {
                if(this.y >= this.lastY) {
                    var offset = this.y + this.height - elem[i].y;
                    this.y -= offset;
                }
                else{
                    var offset = elem[i].y + elem[i].height - this.y;
                    this.y += offset;
                    this.forceJump(0);
                }
            }
            if(offsetColision(this, elem[i], 1)) {
                this.isFalling = false;
                colided = true;
            }
        }
        if(!colided) {
            this.jump(0);
        }
    }
};
Player.prototype.portalColision = function() {
    if(this.portal.visible && !this.portal.moving && colision(this, this.portal)){
        this.forceJump(250);
        this.portal.visible = false;
    }
};
Player.prototype.setPortal = function(e) {
    var point = {x : (this.x + this.width/2), y : (this.y + (this.height/2))}
    var angle = - angleRadian(point, e);
    this.portal.shoot((this.x + (this.width / 2)), (this.y + (this.height/2)), angle);
};
Player.prototype.update = function() {
    this.fall();
    this.colisionY();
    this.move();
    this.colisionX();
    this.portalColision();
    this.portal.update(this.obstacles);
};

function angleRadian(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}