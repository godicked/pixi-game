function Game() {
    this.renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor : 0xB0B9C2});
    document.body.appendChild(this.renderer.view);
    this.stage = new PIXI.Container();
    
    
    var loader = PIXI.loader;
    loader.add('cat', '/public/ressources/perso.png');
    loader.add('tiles', '/public/ressources/tiles_grey.jpg');
    
    loader.on('load', function(loader, resources) {
        console.log('file ' + resources.name + ' : loaded');
    });
    
    loader.once('complete', function(loader, resources) {
        this.map = new Map(resources);
        this.map.loadTest();
        this.stage.addChild(this.map);
        this.update();       
        this.stage.interactive = true;
        this.stage.on('click', function(e) {
            this.map.click(e.data.getLocalPosition(this.map.element));
        }.bind(this));
        
    }.bind(this));
    
    loader.load();
    
}
Game.prototype.update = function() {
    requestAnimationFrame(this.update.bind(this));
    this.map.update();
    this.renderer.render(this.stage);
};



function Rectangle(x,y, width, height) {
    PIXI.Graphics.call(this);
    this.beginFill(0x000000);
    this.drawRect(0,0,width,height);
    this.endFill();
    this.x = x;
    this.y = y;
}
Rectangle.prototype = Object.create(PIXI.Graphics.prototype);

function colision(obj1, obj2) {
    if(obj1.x + obj1.width > obj2.x && obj1.x < obj2.x + obj2.width && obj1.y + obj1.height > obj2.y && 
       obj1.y < obj2.y + obj2.height) {
        return true;
    }
    else {
        return false;
    }
}

function offsetColision(obj1, obj2, oY) {
    if(obj1.x + obj1.width > obj2.x && obj1.x < obj2.x + obj2.width && obj1.y + obj1.height +oY> obj2.y && 
       obj1.y < obj2.y + obj2.height) {
        return true;
    }
    else {
        return false;
    }
}