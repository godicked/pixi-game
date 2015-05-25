function Game(){

    var right = new Keyboard(39);
    
    right.press = function() {
        this.perso.vx += 10;
    }.bind(this);
    
    right.release = function() {
        this.perso.vx -= 10;
    }.bind(this);
    
    var left = new Keyboard(37);
    left.press = function() {
        this.perso.vx -= 10;
    }.bind(this);
    
    left.release = function() {
        this.perso.vx += 10;
    }.bind(this);
    
    var up = new Keyboard(38);
    up.press = function() {
        this.perso.jump();
    }.bind(this);
    
    up.release = function() {
    }.bind(this);
    
    
	this.stage = new PIXI.Stage(0xB0B9C2);
    this.renderer = PIXI.autoDetectRenderer(
        1280, 700,
        {antialiasing: false, transparent: false, resolution: 1}
    );
    document.body.appendChild(this.renderer.view);
	var loader = new PIXI.AssetLoader(["/public/ressources/perso.png"]);
    loader.onComplete = this.setup.bind(this);
    loader.load();
}

Game.prototype.update = function() {
    this.perso.update();
	this.renderer.render(this.stage);
	requestAnimFrame(this.update.bind(this));
};

Game.prototype.setup = function(stage) {
    var texture = PIXI.TextureCache["/public/ressources/perso.png"];
    var perso = new Perso();
    perso.addImage(texture, "face");
    perso.setImage("face");
    
    var portal = new Portal();
    this.stage.addChild(portal);
    
    this.perso = perso;
    this.stage.addChild(this.perso);
    
    
    this.update.bind(this);
    requestAnimFrame(this.update.bind(this));
};