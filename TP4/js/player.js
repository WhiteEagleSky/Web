function Player(){
    this.x = 20;
    this.y = 100;
    this.ySpeed = 10;
    this.playerHeight = 15;
    this.playerWidth = 32;
    this.imgHeight = 29;
    this.imgWidth = 64;
    this.img = new Image();

    this.img.src = "./assets/Ship/f1.png";

    this.moveUp = function() {
        this.y -= this.ySpeed;
    };
    this.moveDown = function() {
        this.y += this.ySpeed
    };
}