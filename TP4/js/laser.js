function Laser(x, y) {
    this.x = x;
    this.y = y;
    this.height = 4;
    this.width = 8;
    this.xSpeed = 5;
    this.updatePosition = function() {
        this.x += this.xSpeed;
    };
    this.getCollisionRect = function() {
        return {x: this.x, y: this.y,
            width: this.width, height: this.height};
    };
}
