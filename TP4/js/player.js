function Player(){
    this.x = 20;
    this.y = 100;
    this.ySpeed = 1;
    this.yStep = 10;
    this.targetY = this.y;
    this.playerHeight = 15;
    this.playerWidth = 32;
    this.imgHeight = 29;
    this.imgWidth = 64;
    this.img = new Image();

    this.img.src = "./assets/Ship/f1.png";

    this.moveUp = function() {
        if(this.targetY - this.ySpeed < 0) {
            return;
        }

        this.targetY -= this.yStep;
    };
    this.moveDown = function() {
        if(this.targetY + this.yStep + this.imgHeight / 2 > ArenaHeight) {
            return;
        }
        this.targetY += this.yStep;
    };
    this.getCollisionRect = function() {
        return {x: this.x, y: this.y,
            width: this.playerWidth, height: this.playerHeight};
    };
    this.render = function(ctx) {
        ctx.drawImage(this.img, 0, 0, this.imgWidth, this.imgHeight, this.x, this.y, this.playerWidth, this.playerHeight);
    }
}