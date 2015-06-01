function Portal(x,y){
    PIXI.Graphics.call(this);
    this.beginFill(0x0000ff);
    this.drawRect(0,0,30,10);
    this.endFill();
    this.moving = false;
    this.visible = false;
    this.x = x;
    this.y = y;
    this.lastY = y;

}
Portal.prototype = Object.create(PIXI.Graphics.prototype);
Portal.prototype.shoot = function(x, y, angle) {
    if(!this.moving) {
        this.initialX = x;
        this.initialY = y;
        this.x = x;
        this.y = y;
        this.lastY = y;
        this.cos = Math.cos(angle);
        this.sin = Math.sin(angle);
        this.moving = true;
        this.visible = true;
        this.time = 0;
        this.speed = 150;
        this.g = 30;
    }
};
Portal.prototype.move = function(obstacles) {
    this.time += 0.1;
    this.moveY();
    this.colisionY(obstacles);
    this.moveX();
    this.colisionX(obstacles);
};
Portal.prototype.moveX = function() {
    if(this.moving) {
        this.x = this.initialX + this.speed * this.cos * this.time;
    }
};
Portal.prototype.moveY = function() {
    if(this.moving) {
        this.lastY = this.y;
        this.y = this.initialY - ((-this.g * this.time * this.time) + (this.speed * this.sin * this.time));
    }
};
Portal.prototype.update = function(obstacles) {
    if (this.moving) {
        this.move(obstacles);
    }
};
Portal.prototype.colisionX = function(obstacles) {
    var elem = obstacles.children;
    var l = elem.length;
    for (i = 0; i < l; i+=1) {
        if(colision(this, elem[i])) {
            if(this.cos >= 0) {
                var offset = this.x + this.width - elem[i].x;
                this.x -= offset;
            }
            else{
                var offset = elem[i].x + elem[i].width - this.x;
                this.x += offset;
            }
            this.cos = 0;
            this.initialX = this.x;
        }
    }
};
Portal.prototype.colisionY = function(obstacles) {
    if(this.y + this.height >= 600) {
        this.moving = false;
        this.y = 600 - this.height;
    }
    else {
        var elem = obstacles.children;
        var l = elem.length;
        for (i = 0; i < l; i+=1) {
            if(colision(this, elem[i])) {
                if(this.y >= this.lastY) {
                    var offset = this.y + this.height - elem[i].y;
                    this.y -= offset;
                    this.moving = false;
                }
                else{
                    var offset = elem[i].y + elem[i].height - this.y;
                    this.y += offset;
                    this.fall();
                }
            }
        }
    }
};
Portal.prototype.fall = function() {
    this.initialY = this.y;
    this.initialX = this.x;
    this.sin = -this.sin;
    this.time = 0;
    this.speed = this.speed / 2;
};
