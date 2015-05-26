function Portal(x,y){
    PIXI.Graphics.call(this);
    this.beginFill(0x000000);
    this.drawRect(0,0,20,5);
    this.endFill();
    this.x = x;
    this.y = y;
}

Portal.prototype = Object.create(PIXI.Graphics.prototype);
