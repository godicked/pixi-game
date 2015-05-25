function Background() {
	var texture = PIXI.Texture.fromImage("/public/ressources/background.jpg");
	PIXI.Sprite.call(this, texture, 512, 256);
	
	this.position.x = 0;
	this.position.y = 0;
}

Background.constructor = Background;
Background.prototype = Object.create(PIXI.Sprite.prototype);