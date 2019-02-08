function Target(x, y, t2) {
    this.x = x;
    this.y = y;
    this.t2 = t2;
    this.height = 4;
    this.width = 8;
    this.targetHeight = 30;
    this.targetWidth = 30;
    this.imgHeight = 40;
    this.imgWidth = 40;
    this.xSpeed = -1;
    this.img = new Image();
    this.a = Math.random() * 2;
    // noinspection PointlessArithmeticExpressionJS
    this.a = Math.random() * 2 + 0;
    this.b = Math.random() * 2 + 2;
    this.c = Math.random() * 2 + 3;
    this.s = Math.random() > 0.5 ? -1 : 1;

    this.t = 0;
    this.dt = 0.01;
    this.lives = this.t2 ? 2 : 1;

    this.img.src = this.t2 ? "./assets/Enemy/Example/e2_f1.png" : "./assets/Enemy/Example/e_f1.png";

    this.yFunction = function(t) {
        return 1 / 3 * this.s * (Math.sin(this.a * t) + Math.sin(this.b * t) + Math.sin(this.c * t)) * ArenaHeight;
    };
    this.updatePosition = function() {
        this.t += this.dt;
        this.x += this.xSpeed;
        this.y = this.yFunction(this.t);
    };
    this.getCollisionRect = function() {
        return {
            x: this.x, y: this.y,
            width: this.targetWidth, height: this.targetHeight
        };
    };
}