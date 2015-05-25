function Portal(){
    PIXI.Graphics.call(this);
    this.beginFill(0x000000);
    this.drawRect(0,0,100,20);
    this.endFill();
    this.x = 300;
    this.y = 680;
}

Portal.prototype = Object.create(PIXI.Graphics.prototype);
