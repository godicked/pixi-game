function Perso() {
	PIXI.TilingSprite.call(this);
    this.x = 640-64;
	this.y = 636;
    this.vx = 0;
    this.images = {};
    this.jumpForce = 150;
    this.jumpY = this.y;
    
    this.jumping = false;
    this.jumpSpeed = 0;
    this.time = 0;
    
    
}

Perso.prototype = Object.create(PIXI.Sprite.prototype);

Perso.prototype.addImage = function(texture, name){
    this.images[name] = texture;
};

Perso.prototype.setImage = function(name) {
    this.texture = this.images[name];
};

Perso.prototype.update = function() {
    this.x += this.vx;
    
    if(this.onPortal){
        this.jump();
        this.jumpSpeed = 250;
    }
    
    if(this.jumping){
        this.time += 0.1;
    }
    
    this.y = this.jumpY-((-30*this.time*this.time) + (this.jumpSpeed * this.time));
    
    if(this.y >= 636){
        this.y = 636;
        this.jumping = false;
        this.time = 0;
        this.jumpSpeed = 0;
    }
};

Perso.prototype.jump = function() {
    if(!this.jumping){
        this.jumping = true;
        this.jumpSpeed = this.jumpForce;
        this.jumpY = this.y;
    }
};