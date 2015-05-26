function Game(){
   
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
    this.level.update();
	this.renderer.render(this.stage);
	requestAnimFrame(this.update.bind(this));
};

Game.prototype.setup = function(stage) {
    var texture = PIXI.TextureCache["/public/ressources/perso.png"];
    var perso = new Perso();
    perso.addImage(texture, "face");
    perso.setImage("face");
    
    var level = new Map(20);
    level.setPlayer(perso);
    level.draw();
    this.level = level;
    this.stage.addChild(this.level);
    this.stage.click = function(e) {
        this.level.getClick(e.getLocalPosition(this.stage).x);
    }.bind(this);
    
    this.update.bind(this);
    requestAnimFrame(this.update.bind(this));
};