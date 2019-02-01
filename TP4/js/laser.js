function Laser(x, y) {
    this.x = x;
    this.y = y;
    this.height = 4;
    this.width = 8;
    this.xSpeed = 20;
    this.updatePosition = function() {
        this.x += this.xSpeed;
    };
}
